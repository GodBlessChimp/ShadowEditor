// Copyright 2017-2020 The ShadowEditor Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.
//
// For more information, please visit: https://github.com/tengge1/ShadowEditor
// You can also visit: https://gitee.com/tengge1/ShadowEditor

package department

import (
	"net/http"

	"go.mongodb.org/mongo-driver/bson"

	"github.com/tengge1/shadoweditor/server/helper"
	"github.com/tengge1/shadoweditor/server/server"
	"github.com/tengge1/shadoweditor/server/server/system"
)

func init() {
	server.Mux.UsingContext().Handle(http.MethodGet, "/api/Department/List", List)
}

// List returns the department list.
func List(w http.ResponseWriter, r *http.Request) {
	db, err := server.Mongo()
	if err != nil {
		helper.Write(w, err.Error())
		return
	}

	// get all the users
	users := []system.User{}

	err = db.FindMany(server.UserCollectionName, bson.M{}, &users)
	if err != nil {
		helper.Write(w, err.Error())
		return
	}

	// get all the departments
	filter := bson.M{
		"Status": 0,
	}

	list := []system.Department{}

	err = db.FindMany(server.DepartmentCollectionName, filter, &list)
	if err != nil {
		helper.Write(w, err.Error())
		return
	}

	for key := range list {
		adminID := list[key].AdminID
		var admin system.User

		for _, user := range users {
			if user.ID == adminID {
				admin = user
				break
			}
		}

		list[key].AdminID = adminID
		list[key].AdminName = admin.Name
	}

	helper.WriteJSON(w, server.Result{
		Code: 200,
		Msg:  "Get Successfully!",
		Data: list,
	})
}
