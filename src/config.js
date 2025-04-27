import {config} from "dotenv";
config();

console.log(process.env.desarrolladorFullStack);
export default 
{
    port:process.env.port
}