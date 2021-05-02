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
  "id": 3337639689365824966,
  "jsonrpc": "2.0",
  "method": "state_get_balance",
  "params": {
    "purse_uref": "uref-5fe1502c686f888698498625f17cf66531783bda4c154f4b96fe21f8b6b01e38-007",
    "state_root_hash": "64b04da6e408198ded926eeba8b3de8e1d7e3040236e2a9f306e414e617120e0"
  }
}
`)

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