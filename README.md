# config server nodejs with orm sequelize v6

> `npm i --save-exact express@4.17.2 dotenv@10.0.0 body-parser@1.19.1 ejs@3.1.6 nodemon@2.0.15 mysql2@2.3.3`

---

**Cofig babel**

> `npm i --save-exact @babel/core@7.15.4 @babel/node@7.15.4 @babel/preset-env@7.15.4`

---

**Config bcryptjs**

> `npm i --save-exact bcryptjs@2.4.3`

---

**Config sequelize**

> `npm i --save-exact sequelize@6.13.0 sequelize-cli@6.3.0` >
> Cài đặt ORM và sequelize-cli để chạy giao diện dòng lệnh

**create file `.sequelizerc`**

> Sequelizerc dùng để cài dặt các đường dẫn khi tạo ra các thư mục theo cấu trúc có sẵn của sequelize

**Chạy câu lệnh : `node_modules/.bin/sequelize init`**

> Câu lệnh dùng để tạo ra các thư mục config/migrations/seeders/models dựa trên cấu hình trong file .sequelizerc

### [migrations](https://sequelize.org/docs/v6/other-topics/migrations/)

> `npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`

> Tạo 1 table mới trong db bằng cách chạy dòng lệnh để tạo table mẫu trong thư mục migrations

> ` npx sequelize-cli db:migrate`

> Chạy dòng lệnh để tạo table trong mysql dựa trên table đã tạo sẵn trong thư mục migrations
> Vậy models sinh ra với mục đích định nghĩa table ví dụ : User , và file được ánh xạ trong migrations với file create-user quy định chi tiết những thông tin tạo trong database

> `npx sequelize-cli seed:generate --name demo-user`
> Mục đích chạy câu lệnh này để gennerate ra form mẫu trong thư mục seeders

> `npx sequelize-cli db:seed:all`
> Sau khi chèn dữ liệu mẫy trong file seeders/demo-user thì chạy câu lệnh này để chèn trực tiếp vào trong db

```JavaScript
"define":{
    "freezeTableName":true
    },
"logging":false
```

> 2 dòng code này được đặt trong file config/config.json
> "freezeTableName":true cấu hình object này nhằm mục đích đặt tên models và migrations trùng nhau đẩy lên database
> logging":false không log ra câu lệnh truy vấn sql khi thao tác với db

### [model-instances](https://sequelize.org/docs/v6/core-concepts/model-instances/)

**Trong`sequelize`**

> Tạo mới 1 user dùng `create`
> Update user dùng `save`

### [model-querying-finders](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/)

> Tìm tất cả `findALL`
> Tìm theo PK `findByPk`
> Tìm 1 phần tử `findOne`
> và rất nhiều method khác có thể tham khảo tại link **(sequelize)[https://sequelize.org/docs/v6/]**

> **`lưu ý :`**

> `findAll` : Trả ra tất cả các phần , mỗi phần tử là một object và được ném vào mảng
> `findOne` : Chỉ trả ra một object, nhưng object này là của sequelize hay còn gọi là sequelize modal , muốn convert sang object mà javascript hiểu được thì cần truyền thêm 1 thuộc tính data.get({plain:true})

```JavaScript
const getOneUser=()=>{
    let user = await db.User.findOne({...})
    user= user.get({plain:true})
    return user
}
```

> => khi sử dụng cách này user vẫn là sequelize object nhưng khi lấy ra sử dụng chúng ta lại gán lại thành 1 object của javascript

```JavaScript
{raw: true}
```

> => nếu sử dụng raw : true trong khi truy vấn thì kết quả trả ra là 1 object của javascript , sau này nếu muốn thao tác với object đó để lưu hay làm gì khác với sequelize thì không được , tại vì sequezile chỉ nhận mỗi sequelize object mà nó trả ra

### [simple-delete-queries](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-delete-queries)

> để xóa 1 phần tử dùng hàm `destroy`

### [simple-update-queries](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries)

> để cập nhập dùng hàm `update`

[How to write readme file ?](https://ihoctot.com/cach-viet-readme-md)
