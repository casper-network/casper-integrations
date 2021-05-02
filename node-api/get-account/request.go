package main

import (
        "fmt"
        "strings"
        "net/http"
        "io/ioutil"
)

func main() {

        url := "3.136.227.9:7777/rpc"
        method := "POST"

        payload := strings.NewReader(`{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "state_get_item",
    "params": {
        "state_root_hash": "c5dde8cdc701739619a37472abe43d65c672107415df70275d9b2b9fde294e72",
        "key": "account-hash-49ade8ee1c4a54c7c799846ac5ace380134c3996f2ff28b4617cb8ccc4fde058",
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
        req.Header.Add("Content-Type", "application/json")

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