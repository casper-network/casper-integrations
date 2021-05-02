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
    "method": "chain_get_state_root_hash"
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