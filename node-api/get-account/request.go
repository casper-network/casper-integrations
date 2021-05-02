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
        "state_root_hash": "33e257bc70f7094d030a18f8aede3d58d8e202fb946810ce3292625fe853b636",
        "key": "account-hash-21e8cee83ced9ff174357dc5d9b797f259994354993f01e18db49cda2a7700b3",
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