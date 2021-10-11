package main

import (
	"fmt"
	"github.com/casper-ecosystem/casper-golang-sdk/sdk"
)

func main() {
	url := "http://3.136.227.9:7777/rpc"
	stateRootHash := "33e257bc70f7094d030a18f8aede3d58d8e202fb946810ce3292625fe853b636"
	uref := "uref-b3a323e529dc59f3a1042ea89e60a66ecd8fc9ee0991398d7760e24e72b2f49d-007"

	client, err := sdk.NewRpcClient(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	balance, err := client.GetAccountBalance(stateRootHash, uref)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(balance)
}
