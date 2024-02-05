express = require('express')
app = express();
path = require('path');
bcrypt = require('bcrypt');
Student = require('./database');
port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '../public')));

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
// app.set("views",path.join(__dirname,"views"))
// app.set(express.static(path.join(__dirname,"public")))

app.get('/',(req,res)=>{
    res.render("login");
})

app.get('/home',(req,res)=>{
    res.render('home')
})

app.post("/", async(req, res) => {
    // const {username,password} = req.body;
    data = {
        username : req.body.username,
        password : req.body.password
    }
    const checkuser = await Student.findOne({username: data.username})
    if(checkuser){
        const checkpass = await bcrypt.compare(data.password ,checkuser.password)
        if (checkpass){res.redirect('/home')}
        else{res.send('incorrect password')}
    }
    else(res.send('username dose not exsits'))
    // console.log(username,password)
    res.redirect('/register')
})
    


// app.post("/", async (req, res) => {
//     try {
//         const checkuser = await Student.findOne({ username: req.body.username });
//         if (checkuser) {
//             const checkpass = await bcrypt.compare(req.body.password, checkuser.password);
//             if (checkpass) {
//                 res.redirect('/home');
//             } else {
//                 res.send('Incorrect password');
//             }
//         } else {
//             res.send('Username does not exist');
//         }
//     } catch (error) {
//         console.error('Error during password comparison:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });




app.post('/register',async(req,res)=>{
    const {username,password} = req.body;

    existinguser = await Student.findOne({username})
    if (existinguser) {
        res.send("User already exists!. Please try another username.")}
    else {

    saltRounds = 10;
    console.log(username,password)
    encpass = await bcrypt.hash(password,saltRounds)
    console.log(encpass)
    newStudent = new Student({username:username,password:encpass})
    StudentSave = await newStudent.save();
    res.redirect('/register');}
  
})

app.get('/register',(req,res)=>{
    res.render("register")
})

app.listen(port,()=>{
    console.log("Server is running at port " + port);
})