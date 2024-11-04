package internal

import "errors"

func Login(username string, password string) error {
	if username == "username" && password == "password" {
		return nil
	}
	return errors.New("账号密码错误,正确账号username,密码password")
}
