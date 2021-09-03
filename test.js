let User = require("./src/models/user");
const request = require("supertest")("http://localhost:3000/api");
const expect = require("chai").expect;
const user = require("./src/models/user");
let assert = require("chai").assert

let token;
let userId;
let courseId;
let commandId;
let companyId;
let commandLineId;
//Auth

describe("POST /register", () => {
    it("Should create user", async function () {
        const response = await request
        .post("/register")
        .send({
            email: "floridaq@hotml.fr",
            user_password: "Passw7842ord",
            user_name: "flo45892",
            firstname: "antoine",
            lastname: "liro",
            avatar: "http://img.com",
            birth_date: "1992-02-05",
            phone_number: "+33622014578",
            street_name: "Rue des cailloux",
            street_number: 145,
            batiment: "A",
            postal_code: "75017"
        })
        userId = response.body.data.id
        expect(response.status).to.eql(201);
    })
})

describe("POST /register", () => {
    it("Should not create user because email already exist", async function () {
        const response = await request
        .post("/register")
        .send({
            email: "floridaq@hotml.fr",
            user_password: "Passw7842ord",
            user_name: "flo45892",
            firstname: "antoine",
            lastname: "liro",
            avatar: "http://img.com",
            birth_date: "1992-02-05",
            phone_number: "+33622014578",
            street_name: "Rue des cailloux",
            street_number: 145,
            batiment: "A",
            postal_code: "75017"
        })
       
        expect(response.status).to.eql(400);
        expect(response.body.data.name).to.eql("SequelizeUniqueConstraintError");
    })
})

describe("POST /register", () => {
    it("Should not create user because user_name cannotbe null", async function () {
        const response = await request
        .post("/register")
        .send({
            email: "floidaq@hotml.fr",
            user_password: "Passw7842ord"
        })
        expect(response.status).to.eql(400);
        expect(response.body.message).to.eql("notNull Violation: User.user_name cannot be null");
        
    })
})

describe("POST /register", () => {
    it("Should not create user because password length min 8", async function () {
        const response = await request
        .post("/register")
        .send({
            email: "floidaq@hotml.fr",
            user_password: "Pass",
            user_name: "flods45892"
        })
        expect(response.status).to.eql(401);
        expect(response.body.message).to.eql("Le mot de passe ne peut pas être inférieur à 8 caractères");
        
    })
})

describe("POST /login", function () {
    it("Should login user and return auth token", async function () {
        const response = await request
            .post("/login")
            .send({
                    email: "floridaq@hotml.fr",
                    user_password: "Passw7842ord"
                })
  
        expect(response.status).to.eql(200);
  
        const attributes = response.body;
        const attributesData = response.body.data;
        token = response.body.token
        expect(attributes.data).to.include.keys("id", "email", "user_password", "user_name", "firstname", "lastname", "avatar", "birth_date", "phone_number", "street_name", "batiment", "postal_code", "createdAt", "updatedAt");
        expect(attributes.success).to.eql("L\'utilisateur a été connecté avec succès");   

    });
});




describe("POST /course", () => {

    it("Should not create course because user not given rights access", async function () {
        const response = await request
        .post("/course")
        .send({
            author: "florianbracq",
            title: "Introduction à node.js",
            description: "Vous souhaitez découvrir nodeJS, ce cour est fait pour vous.",
            image: "http://image.com",
            rate: 5,
            price: 12,
            datePublish: "2021-05-30",
            UserId: userId
        })
      
        expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
        expect(response.status).to.eql(401);
 
    })
})

describe("GET /course/:id", () => {
    
    it("Should GET course by ID", async function () {
        const taskId = 8
        const response = await request
        .get("/course/"+ taskId)
        .set({ Authorization: `Bearer ${token}` })
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("Le cour a bien été trouvé.");   
        expect(response.body).to.be.a("object");
    })
})

describe("PUT /user/:id", function () {
    it("Should update user", async function () {
        const taskId = userId
        const response = await request
            .put("/user/" + taskId)
            .send({
                    email: "florianbracq@hotmail.fr",
                    phone_number: "0123453212"
            })
            .set({ Authorization: `Bearer ${token}` })
  
        expect(response.status).to.eql(200);
  
        const attributes = response.body;
        const attributesData = response.body.data;
        expect(attributes.data).to.include.keys("id", "email", "user_password", "user_name", "firstname", "lastname", "avatar", "birth_date", "phone_number", "street_name", "batiment", "postal_code", "createdAt", "updatedAt");

    });
});

describe("PUT /user/:id", function () {
    it("Should not update user because user not given access rights", async function () {
        const taskId = 46
        const response = await request
            .put("/user/" + taskId)
            .send({
                    email: "florianbracq@hotmail.fr",
                    phone_number: "0123453212"
            })
  
            expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
            expect(response.status).to.eql(401);
  
    });
});

describe("PUT /user/:id", function () {
    it("Should not update user because user not have access rights", async function () {
        const taskId = 46
        const response = await request
            .put("/user/" + taskId)
            .send({
                    email: "florianbracq@hotmail.fr",
                    phone_number: "0123453212"
            })
            .set({ Authorization: `Bearer fzefzefzef` })
        
            expect(response.body.message).to.eql("L'utilisateur n'est pas autorisé à accèder à cette ressource.");   
            expect(response.status).to.eql(401); 
  
    });
});

describe("GET /courses", () => {
    
    it("Should return all courses", async function () {
        const response = await request
        .get("/courses")
        .set({ Authorization: `Bearer ${token}` })

        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("La liste des cours a bien été récupérée.");
    })
})

describe("GET /courses", () => {
    
    it("Should not get courses because user not given access rights", async function () {
        const response = await request
        .get("/courses")

        expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
        expect(response.status).to.eql(401);
    })
})

describe("POST /company", () => {

    it("Should create company", async function () {
        const response = await request
        .post("/company")
        .send({
            name: "skillup-test",
            street_name: "rue des plantes",
            street_number: 132,
            postal_code: "27985",
            country: "France",
            siret: "zefzefio7843"
        })
        .set({ Authorization: `Bearer ${token}` })

        companyId = response.body.data.id;
        expect(response.status).to.eql(201);
        expect(response.body.message).to.eql("L'entreprise a été crée avec succès");   
        expect(response.body).to.be.a("object");
 
    })
})

describe("POST /company", () => {

    it("Should not create company because user not given rights access", async function () {
        const response = await request
        .post("/company")
        .send({
            name: "skillup-test",
            street_name: "rue des plantes",
            street_number: 132,
            postal_code: "27985",
            country: "France",
            siret: "zefzefio7843"
        })
 
        expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
        expect(response.status).to.eql(401);  
        expect(response.body).to.be.a("object"); 
 
    })
})

describe("POST /company", () => {

    it("Should not create company because user not have rights access", async function () {
        const response = await request
        .post("/company")
        .send({
            name: "skillup-test",
            street_name: "rue des plantes",
            street_number: 132,
            postal_code: "27985",
            country: "France",
            siret: "zefzefio7843"
        })
        .set({ Authorization: `Bearer fzefzefzef` })
        
        expect(response.body.message).to.eql("L'utilisateur n'est pas autorisé à accèder à cette ressource.");   
        expect(response.status).to.eql(401); 
 
    })
})

describe("GET /company/:id", () => {
    
    it("Should GET company by ID", async function () {
        
        const response = await request
        .get("/company/"+ companyId)
        .set({ Authorization: `Bearer ${token}` })
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("L\'entreprise a bien été trouvé.");   
        expect(response.body).to.be.a("object");
    })
})

describe("GET /company/:id", () => {
    
    it("Should not GET company by ID because user not given rights access", async function () {
        
        const response = await request
        .get("/company/"+ companyId)
        
        expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
        expect(response.status).to.eql(401);  
        expect(response.body).to.be.a("object"); 
    })
})

describe("GET /company/:id", () => {
    
    it("Should not GET company by ID because user not have rights access", async function () {
        
        const response = await request
        .get("/company/"+ companyId)
        .set({ Authorization: `Bearer fzefzefzef` })
        
        expect(response.body.message).to.eql("L'utilisateur n'est pas autorisé à accèder à cette ressource.");   
        expect(response.status).to.eql(401); 
    })
})


describe("POST /command", () => {

    it("Should create command", async function () {
        const response = await request
        .post("/command")
        .send({
            UserId: userId,
            createdAt: "2021-06-25 08:50:25"
        })
        .set({ Authorization: `Bearer ${token}` })
        commandId = response.body.data.id;
        expect(response.status).to.eql(201);
        expect(response.body.message).to.eql("La commande a été crée avec succès.");   
        expect(response.body).to.be.a("object");
 
    })
})


describe("POST /command", () => {

    it("Should not create command because user not given rights access", async function () {
        const response = await request
        .post("/command")
        .send({
            UserId: userId,
            createdAt: "2021-06-25 08:50:25"
        })
        
        expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
        expect(response.status).to.eql(401); 
 
    })
})

describe("POST /command", () => {

    it("Should not create command because user not have rights access", async function () {
        const response = await request
        .post("/command")
        .send({
            UserId: userId,
            createdAt: "2021-06-25 08:50:25"
        })
        .set({ Authorization: `Bearer fzefzefzef` })
        
        expect(response.body.message).to.eql("L'utilisateur n'est pas autorisé à accèder à cette ressource.");   
        expect(response.status).to.eql(401); 
 
    })
})

describe("POST /commandline", () => {

    it("Should create command line", async function () {
        const response = await request
        .post("/commandline")
        .send({
            quantity: 2,
            CommandId: commandId,
            CourseId: courseId
        })
       
        .set({ Authorization: `Bearer ${token}` })
        expect(response.status).to.eql(201);
        expect(response.body.message).to.eql("La ligne de commande a été crée avec succès");   
        expect(response.body).to.be.a("object");
 
    })
})

describe("POST /commandline", () => {

    it("Should not create command line because user not given rights access", async function () {
        const response = await request
        .post("/commandline")
        .send({
            quantity: 2,
            CommandId: commandId,
            CourseId: courseId
        })
        
        expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
        expect(response.status).to.eql(401);
 
    })
})

describe("POST /commandline", () => {

    it("Should not create command line because user not have rights access", async function () {
        const response = await request
        .post("/commandline")
        .send({
            quantity: 2,
            CommandId: commandId,
            CourseId: courseId
        })
        .set({ Authorization: `Bearer fzefzefzef` })
        
        expect(response.body.message).to.eql("L'utilisateur n'est pas autorisé à accèder à cette ressource.");   
        expect(response.status).to.eql(401); 
 
    })
})

describe("POST /invoice", () => {

    it("Should create invoice", async function () {
        const response = await request
        .post("/invoice")
        .send({
            payment_method: "paypal",
            CompanyId: companyId,
            UserId: userId,
            CommandId: commandId
        })
        .set({ Authorization: `Bearer ${token}` })
        expect(response.status).to.eql(201);
        expect(response.body.message).to.eql("La facture a été crée avec succès");   
        expect(response.body).to.be.a("object");
 
    })
})

describe("POST /invoice", () => {

    it("Should not create invoice because user not given rights access", async function () {
        const response = await request
        .post("/invoice")
        .send({
            payment_method: "paypal",
            CompanyId: companyId,
            UserId: userId,
            CommandId: commandId
        })
     
        expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
        expect(response.status).to.eql(401);  
        expect(response.body).to.be.a("object");
 
    })
})

describe("POST /invoice", () => {

    it("Should not create invoice because user not have rights access", async function () {
        const response = await request
        .post("/invoice")
        .send({
            payment_method: "paypal",
            CompanyId: companyId,
            UserId: userId,
            CommandId: commandId
        })
     
        .set({ Authorization: `Bearer fzefzefzef` })
        
        expect(response.body.message).to.eql("L'utilisateur n'est pas autorisé à accèder à cette ressource.");   
        expect(response.status).to.eql(401); 
 
    })
})

describe("GET /commands", () => {
    
    it("Should return all commands", async function () {
       
        const response = await request
        .get("/commands")
        .set({ Authorization: `Bearer ${token}` })

        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("La liste des commandes a bien été récupérée.");
    })
})

describe("GET /commands", () => {
    
    it("Should not get commands because user not given access rights", async function () {
       
        const response = await request
        .get("/commands")
       

        expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
        expect(response.status).to.eql(401);
    })
})

describe("GET /commands/:id", () => {
    
    it("Should return all commands by user", async function () {
        const taskId = commandId
        const response = await request
        .get("/commands/" + taskId)
        .set({ Authorization: `Bearer ${token}` })

        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("Les commandes de l\'utilisateur ont bien été récupérés.");
    })
})

describe("GET /commands/:id", () => {
    
    it("Should not get commands because user not given access rights", async function () {
        const taskId = commandId
        const response = await request
        .get("/commands/" + taskId)

        expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
        expect(response.status).to.eql(401);
    })
})

describe("GET /commands/:id", () => {
    
    it("Should not get commands because user not have access rights", async function () {
        const taskId = commandId
        const response = await request
        .get("/commands/" + taskId)
        .set({ Authorization: `Bearer zeefzefzef` })

        expect(response.body.message).to.eql("L'utilisateur n'est pas autorisé à accèder à cette ressource.");   
        expect(response.status).to.eql(401);
    })
})

describe("GET /command-line/:id", () => {
    
    it("Should return command by id", async function () {
        const taskId = 7
        const response = await request
        .get("/command-line/" + taskId)
        .set({ Authorization: `Bearer ${token}` })

        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("Les lignes de commandes de l\'utilisateur ont bien été récupérées.");
    })
})

describe("GET /command-line/:id", () => {
    
    it("Should not get command line because user not given access rights", async function () {
        const taskId = 7
        const response = await request
        .get("/command-line/" + taskId)

        expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
        expect(response.status).to.eql(401);
    })
})

describe("GET /command-line/:id", () => {
    
    it("Should not get command line because user not authorized", async function () {
        const taskId = 7
        const response = await request
        .get("/command-line/" + taskId)
        .set({ Authorization: `Bearer zeefzefzef` })

        expect(response.body.message).to.eql("L'utilisateur n'est pas autorisé à accèder à cette ressource.");   
        expect(response.status).to.eql(401);
    })
})

describe("GET /invoice-user/:id", () => {
    
    it("Should get invoice by user", async function () {
        
        const response = await request
        .get("/invoice-user/" + userId)
        .set({ Authorization: `Bearer ${token}` })

        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("La facture de l\'utilisateur a bien été récupérée.");
    })
})

describe("GET /invoice-user/:id", () => {
    
    it("Should not get invoice because user not authorized", async function () {
        
        const response = await request
        .get("/invoice-user/" + userId)

        expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
        expect(response.status).to.eql(401);
    })
})

describe("GET /invoice-user/:id", () => {
    
    it("Should not get invoice because user have rights access", async function () {
        
        const response = await request
        .get("/invoice-user/" + userId)
        .set({ Authorization: `Bearer zeefzefzef` })

        expect(response.body.message).to.eql("L'utilisateur n'est pas autorisé à accèder à cette ressource.");   
        expect(response.status).to.eql(401);
    })
})

describe("DELETE /command/:id", () => {
    
    it("Should delete command", async function () {
        const response = await request
        .delete("/command/" + commandId)
        .set({ Authorization: `Bearer ${token}` })
        expect(response.status).to.eql(200);
 
    })
})

describe("DELETE /command/:id", () => {
    
    it("Should not delete command because user not given rigths acces", async function () {
        const response = await request
        .delete("/command/" + commandId)
        
        expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
        expect(response.status).to.eql(401);  
        expect(response.body).to.be.a("object");
    })
})

describe("DELETE /command/:id", () => {
    
    it("Should not delete command because user not have rigths acces", async function () {
        const response = await request
        .delete("/command/" + commandId)
        
        .set({ Authorization: `Bearer fzefzefzef` })
        
        expect(response.body.message).to.eql("L'utilisateur n'est pas autorisé à accèder à cette ressource.");   
        expect(response.status).to.eql(401); 
    })
})



describe("DELETE /company/:id", () => {
    
    it("Should delete company", async function () {
        const response = await request
        .delete("/company/" + companyId)
        .set({ Authorization: `Bearer ${token}` })
        expect(response.status).to.eql(200);
 
    })
})

describe("DELETE /company/:id", () => {
    
    it("Should not delete company because user not given rigths acces", async function () {
        const response = await request
        .delete("/company/" + companyId)

        expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
        expect(response.status).to.eql(401);  
        expect(response.body).to.be.a("object");
 
    })
})

describe("DELETE /company/:id", () => {
    
    it("Should not delete company because user not have rigths acces", async function () {
        const response = await request
        .delete("/company/" + companyId)
        .set({ Authorization: `Bearer fzefzefzef` })
        
        expect(response.body.message).to.eql("L'utilisateur n'est pas autorisé à accèder à cette ressource.");   
        expect(response.status).to.eql(401); 
 
    })
})


describe("DELETE /user/:id", () => {
    
    it("Should delete User", async function () {
        const response = await request
        .delete("/user/" + userId)
        .set({ Authorization: `Bearer ${token}` })
        expect(response.status).to.eql(200);
 
    })
})

describe("DELETE /user/:id", () => {
    
    it("Should not delete user because user not given rigths acces", async function () {
        const response = await request
        .delete("/user/" + userId)

        expect(response.body.message).to.eql("Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.");   
        expect(response.status).to.eql(401);  
        expect(response.body).to.be.a("object");
 
    })
})

describe("DELETE /user/:id", () => {
    
    it("Should not delete user because user not have rigths acces", async function () {
        const response = await request
        .delete("/user/" + userId)

        .set({ Authorization: `Bearer fzefzefzef` })
        
        expect(response.body.message).to.eql("L'utilisateur n'est pas autorisé à accèder à cette ressource.");   
        expect(response.status).to.eql(401); 
 
    })
})



