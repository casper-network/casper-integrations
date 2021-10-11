package main

import (
	"fmt"
	"github.com/casper-ecosystem/casper-golang-sdk/sdk"
)

func main() {

	url := "http://3.136.227.9:7777/rpc"
	stateRootHash := "33e257bc70f7094d030a18f8aede3d58d8e202fb946810ce3292625fe853b636"
	key := "account-hash-21e8cee83ced9ff174357dc5d9b797f259994354993f01e18db49cda2a7700b3"

	client, err := sdk.NewRpcClient(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	storedValue, err := client.GetStateItem(stateRootHash, key, nil)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(storedValue)
}
