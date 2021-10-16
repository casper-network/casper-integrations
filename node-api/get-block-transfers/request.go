package main

import (
	"fmt"
	"github.com/casper-ecosystem/casper-golang-sdk/sdk"
)

func main() {

	url := "http://3.136.227.9:7777/rpc"
	hash := "e2800c21cb3c93b8e82fd348e044456f326bfbfce140bc00581800cce8a18fd4"

	client, err := sdk.NewRpcClient(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	blockTransfers, err := client.GetBlockTransfersByHash(hash)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(blockTransfers)
}
