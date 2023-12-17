"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
scalar Upload

scalar JSON

  type Post {
    id:ID!
    title:String!
    content:String!
    createdAt:String!
    avatar:String
    published:Boolean!
    userId:Int
    cate_id:Int
    user:User
    category:Category
  }

  type User{
    id:ID!
    name:String!
    email:String!
    createdAt:String!
    posts:[Post]
 }

  type Profile {
    id:ID!
    country:String
    location:String
    age:String
    createdAt:String!
    user:User! 
  }

  type Category{
    id:ID!
    name:String!
    user:User
    posts:[Post]
    
  }


  type AuthResponse {
    message:String
    token:String
    status:Int
  }
  type ProfileResponse{
    message:String
    status:Int
    result:Profile
  }
  type PostResponse {
    message:String
    status:Int
    result:Post
  }
  type CategoryResponse{
    message:String
    status:Int
    result:Category
  }

  type Banner{
    id:ID   
    userId:Int
    title:String
    imageUrl:String
  }

  type BannerResponse{
    message:String
    status:Int
    result:Banner
  }

 



  input UpdateUserProfile {
    country:String
    location:String
    age:String
    updatedAt:String!
  }

  input UpdateCategory {
    name:String!
    updatedAt:String
  }

  input PostData {
    title:String,
    content:String,
    avatar:String,
    cate_id:Int,
  }

  input CreateUser{
    name :String,
    email :String,
    password :String
  }

  input Login{
    email:String,
    password:String
  }

  input PostPublish {
    published:Boolean
  }

  input ProfileCreate{
    userId:Int!
  }

 


  type Query {
    users:[User]
    profile:Profile
    posts:[Post]
    categories:[Category]

    
  }


  type Mutation {
    signup(
      makeUser:CreateUser!      
    ):AuthResponse

    signin( 
      email:String!,
      password:String!
    ):AuthResponse

    profile_create(
      profile:ProfileCreate,
    ):ProfileResponse

    profile_update(
      id:Int!,
      input:UpdateUserProfile
    ):ProfileResponse

    category_create(
      name:String!
    ):CategoryResponse

    category_update(
      id:Int!,
      categoryData:UpdateCategory!
    ):CategoryResponse

    category_delete( 
      catId:ID! 
    ):CategoryResponse

    create_banner(
      imageUrl:String!
      title:String!
    ):BannerResponse


    post_create(
      post:PostData!
      
    ):PostResponse

    post_publish(
      postId:ID!
      post:PostPublish!
    ):PostResponse

    post_update(
      postId:ID!
      post:PostData
    ):PostResponse

    post_delete(postId:ID!):PostResponse

  }
`;
