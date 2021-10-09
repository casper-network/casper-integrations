using Casper.Net.Sdk;
using Casper.Net.Sdk.Services;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Numerics;
using System.Threading.Tasks;

namespace erc20
{
    public class Program
    {
        const string RPC_URL = "";
        const string PATH_TO_CONTRACT_KEYS = "";
        const string PATH_TO_USERS = "";

        async static void Main(string[] args)
        {
            Console.WriteLine("Program to show token balances!");

            // Step 1: Set casper node client.
            var client = new CasperJSONRpcService(new HttpClient(), RPC_URL);

            // Step 2: Set contract operator key pair.
            KeyPair keyPairOfContract = Utils.GetKeyPairOfContract(PATH_TO_CONTRACT_KEYS);

            // Step 3: Query node for global state root hash.
            var latestBlockInfo = await client.GetLatestBlockInfo();
            var stateRootHash = latestBlockInfo.Block.Header.StateRootHash;

            // Step 4: Query node for contract hash.
            var contractHash = await Utils.GetAccountNamedKeyValue(client, stateRootHash, keyPairOfContract, "ERC20");

            // Step 5: Query node for token symbol.
            var tokenSymbol = await Utils.GetStateKeyValue(client, stateRootHash, contractHash, "symbol");

            // Step 6: Query node for contract balance - i.e. available supply.
            var balanceOfContract = await GetTokenBalance(client, stateRootHash, contractHash, keyPairOfContract);

            // Step 7: Query node for user balances.
            var balanceOfUsers = await GetTokenBalanceOfUserSet(client, stateRootHash, contractHash);

            // Step 8: Render token balances.
            LogBalances(contractHash, tokenSymbol.ToString(), BigInteger.Parse(balanceOfContract.ToString() ), balanceOfUsers);
        }


        

        /// <summary>
        /// Returns an ERC-20 contract token balance
        /// </summary>
        /// <param name="client"></param>
        /// <param name="stateRootHash">Root hash of global state at a recent block</param>
        /// <param name="contractHash">On-chain ERC-20 contract identifier</param>
        /// <param name="keyPair">Assymmetric keys of an on-chain account</param>
        /// <returns></returns>
        async static Task<object > GetTokenBalance   (CasperJSONRpcService client, string stateRootHash, string contractHash, KeyPair keyPair) {
            var accountHash = Utils.GetAccountHash(keyPair);
            var balanceKey = $"balances_{ accountHash}";

            return await Utils.GetStateKeyValue(client, stateRootHash, contractHash, balanceKey);
        }



        async static Task<List<string>> GetTokenBalanceOfUserSet(CasperJSONRpcService client, string stateRootHash, string contractHash)
        {
            var keyPairSet = Utils.GetKeyPairOfUserSet(PATH_TO_USERS);

            var l = new List<string>();
            foreach (var item in keyPairSet)
            {
                var t = await GetTokenBalance(client, stateRootHash, contractHash, item);
                l.Add(t.ToString());
            }

            return l;

        }


        static void LogBalances(string contractHash, string tokenSymbol, BigInteger balanceOfAvailableSupply, IList<string> balanceOfUsers) {
            Console.WriteLine("" +
                "---------------------------------------------------------------------" +
                $"ERC-20 { tokenSymbol} contract:" +
                "---------------------------------------------------------------------"+
                $"... contract hash = { contractHash}" +
            $"... token balances:"+
            $"... ... available supply: { balanceOfAvailableSupply}");

            foreach (var userID in Enumerable.Range(0,10)) {
                Console.WriteLine($"... ... user { userID + 1}: { balanceOfUsers[userID]}");
            }
        }


    }
}
