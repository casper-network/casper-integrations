package main

import (
        "fmt"
        "net/http"
        "io/ioutil"
)

func main() {

        url := "%7B%7BN1_ADDRESS_REST%7D%7D/metrics"
        method := "GET"

        client := &http.Client {
        }
        req, err := http.NewRequest(method, url, nil)

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