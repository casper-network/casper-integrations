package main

import (
	"fmt"
	"github.com/casper-ecosystem/casper-golang-sdk/sdk"
)

func main() {

	url := "http://3.136.227.9:7777/rpc"

	client, err := sdk.NewRpcClient(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	peers, err := client.GetPeers()
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(peers)
}
