import {  Schema, model } from "mongoose";
import * as hooks from './hooks.js'


const contactShema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite:{
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
    
}, {versionKey: false, timestamps:true})

contactShema.post("save", hooks.handleSaveError);
contactShema.pre("findOneAndUpdate", hooks.setUpdateSetting );
contactShema.post('findOneAndUpdate', hooks.handleSaveError);


const Contact = model("contact", contactShema);
export default Contact;