import { Contact } from "../models/Contact.js";

export const getAllConatact = async (req, res) => {
  try {
    const contacts = await Contact.find(); 
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// get conatct by id
export const getConatactById = async(req,res)=>{
    const id = req.params.id
    const userConatact = await Contact.findById(id);
    if(!userConatact) return res.json({message:"no coantact find",success:'false'})


res.json({message:"Contact Fetched",userConatact,success:'true'})
}

//update conatct by id 
export const updateContactById = async(req,res)=>{
    const id = req.params.id;
    const {name , email,phone,type} =req.body
    let updateContact = await Contact.findByIdAndUpdate(id,{
        name,email,phone,type,},{new:true})

    if(!updateContact) {return res.json({message:"Conatct not found",success:'false'})
    }
    return res.json({message:"Conatct update Successfully....!",success:'true'})

    }


// Delete the conatct by id
export const deleteConatctById = async(req,res)=>{
    const id = req.params.id;
    let deleteConatct = await Contact.findByIdAndDelete(id);
    
    if(!deleteConatct) {return res.json({message:"Conatct not found",success:'false'})
    }
    return res.json({message:"Conatct update Successfully....!",success:'true'})

    }


// get contact by user id
export const getContactByUserId = async (req, res) => {
  const id = req.params.id;

  const userContact = await Contact.find({user:id});
  if (!userContact)
    return res.json({ message: "No Contact find", success: "false" });

  res.json({ message: "User Specific Contact Fetched", userContact, success: true });
};


//create new contact
export const newContact = async(req,res)=>{

    const{name,email,phone,type}= req.body;
    if(name==""||email==""||phone==""||type==""){
        return res.json({message:"All feilds are required"})

    }
let saveContact = await Contact.create({ name,email,phone,type,user:req.user});
 res.json({message:"Conatct saved successfully..!",saveContact,sucess:true})

}


