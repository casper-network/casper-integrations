package main

import (
	"fmt"
	"github.com/casper-ecosystem/casper-golang-sdk/sdk"
)

func main() {

	url := "http://3.136.227.9:7777/rpc"
	hash := "307b88199a20e2e545da07542fff080549fea8924650ea9ec608ebcf46e9a51f"

	client, err := sdk.NewRpcClient(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	block, err := client.GetBlockByHash(hash)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(block)

}
