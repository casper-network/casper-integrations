package main

import (
	"fmt"
	"github.com/casper-ecosystem/casper-golang-sdk/sdk"
)

func main() {

	url := "http://3.136.227.9:7777/rpc"
	deployHash := "6c4048f8ebd40a160e9df47e73680eda8ae8430309a9566655bb357a5967276b"

	client, err := sdk.NewRpcClient(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	deploy, err := client.GetDeploy(deployHash)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(deploy)
}
