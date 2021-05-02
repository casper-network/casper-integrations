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
  "id": 3337639689365824966,
  "jsonrpc": "2.0",
  "method": "state_get_balance",
  "params": {
    "purse_uref": "uref-b3a323e529dc59f3a1042ea89e60a66ecd8fc9ee0991398d7760e24e72b2f49d-007",
    "state_root_hash": "33e257bc70f7094d030a18f8aede3d58d8e202fb946810ce3292625fe853b636"
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