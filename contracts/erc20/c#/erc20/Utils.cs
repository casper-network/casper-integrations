using Casper.Net.Sdk;
using Casper.Net.Sdk.Models;
using Casper.Net.Sdk.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace erc20
{
    public class Utils
    {
        public static string GetAccountHash  (KeyPair keyPair) {
            return ByteUtil.EncodeToBase16(keyPair.ToAccountHash());
        }

        public static async Task<AccountJson> GetAccountInfo (CasperJSONRpcService client, string stateRootHash, KeyPair keyPair) {
                var accountHash = GetAccountHash(keyPair);
                var result = await client.GetBlockState( stateRootHash, $"account-hash-{ accountHash}",new string[] {} );

                return result.Account;
        }

        public static KeyPair GetKeyPairOfContract  (string pathToFaucet) {
            return KeyPair.ParseKeyFiles($"{pathToFaucet}/public_key.pem", $"{pathToFaucet}/secret_key.pem");
        }


        
        /// <summary>
        /// Returns a value under an on-chain account's storage
        /// </summary>
        /// <param name="client">client for interacting with a node</param>
        /// <param name="stateRootHash"></param>
        /// <param name="keyPair">Assymmetric keys of an on-chain account</param>
        /// <param name="namedKey">A named key associated with an on-chain account</param>
        /// <returns></returns>
        public static async Task<string> GetAccountNamedKeyValue(CasperJSONRpcService client, string stateRootHash, KeyPair keyPair, object namedKey) {
            // Chain query: get account information. 
            var accountInfo = await GetAccountInfo(client, stateRootHash, keyPair);

            // Get value of contract v1 named key.
            var res = accountInfo.NamedKeys.FirstOrDefault(ww => ww.Name == namedKey);           
            
            return res.Key;
        }

        public static async Task<object> GetStateKeyValue(CasperJSONRpcService client, string stateRootHash, string stateKey, string statePath)  {
            // Chain query: get global state key value. 
            var res = await client.GetBlockState(stateRootHash, stateKey, new string[] { statePath });
                
            return res.CLValue.Parsed;
        }


        

        /// <summary>
        /// Returns a set ECC key pairs - one for each NCTL user account
        /// </summary>
        /// <param name="pathToUsers">Path to NCTL user directories</param>
        /// <returns>A collection of assymmetric keys</returns>
        public static IEnumerable<KeyPair> GetKeyPairOfUserSet (string pathToUsers) {
            return Enumerable.Range(1, 11).Select(userID => KeyPair.ParseKeyFiles($"{ pathToUsers}/user-${ userID}/public_key.pem", $"{ pathToUsers}/user-${ userID}/secret_key.pem"));
            
        }
    }
}
