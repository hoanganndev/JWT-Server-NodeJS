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
> Nói cách khác , file `Models` là để chúng ta thao tác với code
> Còn file `Migrations` là để chúng ta tạo database

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
const getOneUser= async ()=>{
    let user = await db.User.findOne({...})
    user= user.get({plain:true})
    return user
}
```

> => khi sử dụng cách này user vẫn là sequelize object nhưng khi lấy ra sử dụng chúng ta lại gán lại thành 1 object của javascript

```JavaScript
let getUser= await db.User.findOne({
    where:{id:1},
    raw:true
})
```

> => nếu sử dụng raw : true trong khi truy vấn thì kết quả trả ra là 1 object của javascript , sau này nếu muốn thao tác với object đó để lưu hay làm gì khác với sequelize thì không được , tại vì sequezile chỉ nhận mỗi sequelize object mà nó trả ra

### [simple-delete-queries](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-delete-queries)

> để xóa 1 phần tử dùng hàm `destroy`

### [simple-update-queries](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries)

> để cập nhập dùng hàm `update`

### [data-types](https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types)

> Một số kiểu dữ liệu thường gặp

---

### [association](https://sequelize.org/docs/v6/core-concepts/assocs/)

### [advanced-association](https://sequelize.org/docs/v6/category/advanced-association-concepts/)

---

### [eager-loading](https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/)

---

# Config CORS

> [fix cors](https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue)

```JavaScript
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
```

---

### Config Pagination from backend

> count : => đếm tổng số bản : sum users => Mục đích là đếm tổng số trang

> Total (size) : số lượng lấy ra (limit) => Mỗi một lần lấy ra bao nhiêu phần tử

> Page ? (offset) => Để biết rằng bạn đang ở trang bao nhiêu

> EX :

```SQL
SELECT * FROM User LIMIT 10 OFFSET 4;
```

> Câu lệnh SQL trên nghĩa là lấy ra 10 phần tử tử table `User` và sẽ bắt đầu lấy từ phần tử thứ 5 trở đi

> EX :

> có 30 rows , 1 page có 5 rows => Tổng là 6 pages

> 1,2,3,4,5,6

> vào page 1 : lấy kết quả từ row 1 -> row 5

> vào page 2 : lấy kết quả từ row 6 -> row 10

> vào page 3 : lấy kết quả từ row 11 -> row 15

> ...

> vào page 6 : lấy kết quả từ row 26 -> row 30

> EX : Muốn lấy kết quả từ page thứ 3 thì ta dùng câu lệnh SQL như sau

```SQL
SELECT * FROM User LIMIT 5 OFFSET 10;
```

> Điều này có nghĩa là sẽ lấy giới hạn 5 row và sẽ lấy từ phần từ thứ 11 trở đi

> EX : Tương tự nếu lấy kết quả từ trang 6

```SQL
SELECT * FROM User LIMIT 5 OFFSET 25;
```

> Điều này có nghĩa là sẽ lấy giới hạn 5 row và sẽ lấy từ phần từ thứ 26 trở đi

---

> **_Rút ra kết luận và công thức khi phân trang_**

> Mỗi một lần muốn đổi trang thì cần tính lại thằng `offset`

> Công thức tính `offset` = (`page hiện tại` - `1`) X `số phần tử mỗi page`

> EX : Ví dụ đang ở `page 2` : `offset = ( 2 - 1 ) X 5 = 5`

> Công thức tính tổng cộng `có bao nhiêu page`

> Lấy tổng số items count được , chính là tổng số User trong table chia cho limit

> EX : Tổng User là 30 => `Total Pages = (30/5) = 6`

> Và JS có hàm Math.ceil() để làm tròn số để tính tổng số page nếu là số lẻ
> Ví dụ 3.14 làm tròn thành 4

`Math.ceil(30/5)`

### Sequelize có hỗ trợ method findAndCountAll để tính limit và offset

### [model-querying-finders](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/)

## Config react-paginate npm for frontend

### [react-paginate](https://www.npmjs.com/package/react-paginate)

> npm i --save-exact react-paginate@8.1.0

---

## [How to write readme file ?](https://ihoctot.com/cach-viet-readme-md)
