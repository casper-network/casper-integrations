package main

import (
	"fmt"
	"github.com/casper-ecosystem/casper-golang-sdk/sdk"
)

func main() {

	url := "http://3.136.227.9:7777/rpc"
	hash := "12284e9e6b1c440ee91d2803850a7b7ba5e4c029c6f4abeb8aa1eb743608ab73"

	client, err := sdk.NewRpcClient(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	era, err := client.GetEraBySwitchBlockHash(hash)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(era)
}
