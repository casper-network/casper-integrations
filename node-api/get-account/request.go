package main

import (
        "fmt"
        "strings"
        "net/http"
        "io/ioutil"
)

func main() {

        url := "http://3.136.227.9:7777/rpc"
        method := "POST"

        payload := strings.NewReader(`{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "state_get_item",
    "params": 
        {
            "state_root_hash": "64b04da6e408198ded926eeba8b3de8e1d7e3040236e2a9f306e414e617120e0",
            "key": "account-hash-199ff66a6797f97667340405f4e91269d40a7597a04a86fcbdf478b3eba38eda",
            "path": []
        }
}`)

        client := &http.Client {
        }
        req, err := http.NewRequest(method, url, payload)

        if err != nil {
                fmt.Println(err)
                return
        }
        res, err := client.Do(req)
        if err != nil {
                fmt.Println(err)
                return
        }
        defer res.Body.Close()

        body, err := ioutil.ReadAll(res.Body)
        if err != nil {
                fmt.Println(err)
                return
        }
        fmt.Println(string(body))
}