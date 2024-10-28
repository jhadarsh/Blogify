const express = require("express");
const methodOverride = require('method-override');
const app = express();
const port = 8080;
const path =require("path");
const {v4:uuidv4} = require('uuid');
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));

let posts =[
    {
        id :uuidv4(),
        username : "The Power of Consistency in Achieving Your Goals",
        content : " Consistency isn't about perfection; it's about persistence. When we take small, daily steps toward a goal, we create momentum. Imagine a writer who dedicates just 30 minutes a day to writing. By the end of the year, they'll have written enough to fill a book! In this blog, we explore the science behind consistency, practical tips to stay on track, and real-life stories of people who turned consistent actions into monumental achievements. Remember, the journey of a thousand miles begins with a single step—taken each day.",
    },

    {   
        id:uuidv4(),
        username : "The Evolution of Technology: From Dial-Up to 5G and Beyond",
        content : "The world of technology is constantly evolving. Remember the days of waiting for the dial-up connection tone, or the first time you heard You've got mail!? Fast-forward to today, and we live in a world where information is instantly accessible, and we can connect with anyone around the globe in seconds. The advancements don't stop there—AI, the Internet of Things (IoT), and quantum computing are the next frontiers. This blog explores how these technologies are set to change our world, discussing potential applications, benefits, and the ethical considerations we must keep in mind as we move toward an increasingly digital future.",
    },

    {   
        id :uuidv4(),
        username : "Sustainable Living: Small Changes for a Big Impact",
        content : " Sustainable living is all about making choices that support the health of our planet and future generations. From reducing plastic use to supporting local businesses, there are numerous ways to make an impact. This blog offers practical suggestions, like swapping to reusable bags and containers, conserving energy at home, and choosing eco-friendly products. The goal isn't to be perfect but to be mindful and take small steps consistently. Together, these efforts can lead to significant environmental benefits. After all, change starts with us, one step at a time.",
    },
];




app.get("/",(req,res)=>{
    res.render("index.ejs", {posts}); 
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs"); 
});

app.post("/posts",(req,res)=>{
  let { username ,content} = req.body;
  let id = uuidv4();
  posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
   
});

app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newcontent = req.body.content;
    let newusername = req.body.username;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    post.username = newusername;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
     posts = posts.filter((p) => id !== p.id);
     res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`listening port ${port}`);
});