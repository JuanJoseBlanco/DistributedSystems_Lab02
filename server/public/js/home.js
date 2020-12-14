var select = new Vue({
    el:"#select",
    data:{
        file: undefined,
    },
    methods:{
        async onSelect(){
            const file = this.$refs.file.files[0]
            this.file = file;
            const formData = new FormData();
            formData.append('file',select.file);
            try{
               await axios.post('/upload',formData)
               .then(function (response) {
                   //img = response.data.split('/')[1]
                   //link.img = img[1]
                   link.link = "/send-image?image="+response.data.split('/')[1]
                image.message=response.data;})
               
            }catch(err){
                console.log(err);
                
            }
        }
    }
})

var link = new Vue({
    el:"#link",
    data:{
        img:"",
        link:""
    }
})

var image = new Vue({
    el:"#image",
    data:{
        message:"",
    }
})

var button = new Vue({
    el:"#send",
    methods:{
        async onSubmit(){
            try{
                img =image.message.split('/')
                console.log(img[1]);
                await fetch('http://localhost:3000/send-image?image='+img[1],{
                    method :'GET',
                    mode : "no-cors"
                }).then(function (response){
                console.log(response);
                })
                .then(data => console.log(data));

                //await axios.get('/send-image?image=',img[1])
            }catch(err){
                console.log(err);
            }
        },
    }
})

