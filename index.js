const express = require("express");
const fs = require('fs');

const connectDB = require('./Config/database'); // Import connection function

const filePath = "./TEST_JSON_DATA.json";
const users = require(filePath);

const app = express();
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Connect to MongoDB
connectDB();

// const User = require('./Models/Models');
const { User, UserDetail, Salary } = require('./Models/Models');
// const UserDetail = require('./Models/UserDetail');

// MongoDB Connection String (replace <dbname> with your DB name)
/*const MONGO_URI = 'mongodb://localhost:27017/admin';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define Schema
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    role: String
});

// Create Model
const User = mongoose.model('User', userSchema);

// Define Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true }
});
// Create Model
const User = mongoose.model('User', userSchema);*/


//Middleware
app.use(express.urlencoded({ extended : false }));

//Routes
app.get("/users", async (req, res) => {

    //Create object user
   /*const user = new User({
                        first_name : "Sukhdev",
                        last_name : "Deva",
                        email : "sukhdev@yopmail.com",
                        role: "admin",
                        gender: "Male"
                    });
    
    // Custom logic before saving
    user.first_name = user.first_name.toUpperCase();

    //Save user object data                
    await user.save()
        .then(result =>{
             console.error(result);
        })
        .catch(err => {
            console.error(err);
        });*/

    // =======
    // const user = await User.create({
    //                 first_name: "Sukhdev",
    //                 last_name: "Deva",
    //                 email: "sukhdev@yopmail.com",
    //                 gender: "Male",
    //                 role: "admin"
    //             });

    // await User.insertMany([
    //                 { first_name: "John", last_name: "Doe", email: "john@yopmail.com", gender: "Male", role: "user" },
    //                 { first_name: "Jane", last_name: "Doe", email: "jane@yopmail.com", gender: "Female", role: "admin" }
    //             ]);


    //Save userdeatils
    /*const userDetail = new UserDetail({
        user: user._id,               // Reference to the saved user
        address: "123 Main Street",
        phone: "9876543210",
        dob: new Date("1995-08-15")
    });

    await userDetail.save()
            .then( result => {
                console.log("user deatils saved successfuly");
            })
            .catch( err => {
                console.error( err );
            });

    //Save salary
    // Suppose you already have a user document
    const userF = await User.findOne({ email: 'sukhdev@yopmail.com' });

    if (userF) {
        const salary = new Salary({
            user: userF._id, // reference to User
            basic: 30000,
            hra: 10000,
            bonus: 5000,
            total: 30000 + 10000 + 5000,
            month: 'August',
            year: 2025
        });

        await salary.save();

        console.log("Salary saved successfully.");
    } else {
        console.log("User not found.");
    }*/


    Salary.aggregate([
        {
            $group: {
            _id: null,
            total: { $max: "$total" }
            }
        }
    ]).then( results => {
         const html = `<ul>
                    ${results.map(result => `<li>${result.total}</li>`).join('')}
                </ul>`;
            return res.send(html);
    })
    .catch( err => {
        console.error('err', err);
    });


    /*User.find()
        .then(usersdata => {

            console.log('usersdata',usersdata);

            const html = `<ul>
                    ${usersdata.map(user => `<li>${user.first_name}</li>`).join('')}
                </ul>`;
            return res.send(html);
        })
        .catch(err => {
            console.error(err);
        });*/

    //const html = '<ul>${users.map( (user) => '<li>${user.first_name}</li>' )}</ul>';
    // const html = `<ul>
    //     ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    // </ul>`;
    // return res.send(html);
})

app.get("/api/users",(req, res) => {
    return res.json(users);
})



app.post("/api/users", async (req, res) => {
    const body = req.body;

    users.push({ ...body , id : 1000 + users.length + 1 });

    try {
        const userData = req.body;
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user' });
    }

    // users.push({ ...body, id: users.length + 1 });

    // fs.writeFile(filePath,JSON.stringify(users));
    fs.writeFile(filePath, JSON.stringify(users), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File written successfully');
        }
    });

    return res.json({ status : "pendingij", user : users });
})

app.route("/api/users/:userId")
    .get( (rq, res) => {
        const userId = Number(req.params.userId);
        const user = users.find( user => user.id = userId )
        return res.json(user);
    })
    .patch( (rq, res) => {
       //Edit with id
    })
    .delete( (req, res) => {
        const userId = Number(req.params.userId);
        var newusers = users.filter(user => user.id !== userId);
        
        fs.writeFile(filePath, JSON.stringify(newusers), (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('File written successfully');
            }
        });

        return res.json(newusers);
    })

// app.get("/api/users/:userId",(req, res) => {
//     const userId = Number(req.params.userId);
//     const user = users.find( user => user.id = userId )
//     return res.json(user);
// })
// app.patch("/api/users/:userId",(req, res) => {
   
//     return res.json({ status : "pending" });
// })

// app.delete("/api/users/:userId",(req, res) => {
   
//     return res.json({ status : "pending" });
// })

app.listen(PORT , () => console.log("Server staRT AT PORT 8000") );  
