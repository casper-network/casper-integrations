package main

import (
        "fmt"
        "strings"
        "net/http"
        "io/ioutil"
)

func main() {

        url := "http://3.14.161.135:7777/rpc"
        method := "POST"

        payload := strings.NewReader(`{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "info_get_deploy",
    "params": {
        "deploy_hash": "5db09c0275c4c1ba54ebcc69784ed767350bf9c2b0be7ab4fec1ca84acd1c47d"
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