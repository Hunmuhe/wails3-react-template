package main

import (
	"changeme/internal"
	"fmt"

	"github.com/wailsapp/wails/v3/pkg/application"
)

type GreetService struct{}

func (g *GreetService) Greet(name string) string {
	return "Hello " + name + "!"
}

func (g *GreetService) Login(username string, password string) error {
	err := internal.Login(username, password)
	fmt.Println("err", err)
	if err == nil {
		main_window := App.app.NewWebviewWindowWithOptions(application.WebviewWindowOptions{
			Title:            "Main",
			Width:            1300,
			Height:           800,
			BackgroundColour: application.NewRGB(255, 255, 255),
			URL:              "/?login=true",
		})
		main_window.Center()
		for _, window := range App.windows {
			if window.title == "Login" {
				window.windowp.Close()
				break
			}
		}
	}
	fmt.Println("err", err)
	return err
}
