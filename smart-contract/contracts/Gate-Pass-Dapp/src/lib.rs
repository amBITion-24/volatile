#![allow(non_snake_case)]
#![no_std]
use soroban_sdk::{contract, contracttype, contractimpl, log, Env, Symbol, String, symbol_short};


#[contracttype]
#[derive(Clone)]
pub struct ApprovalStatus {
    pub approved: u64, 
    pub pending: u64,  
    pub expired: u64,  
    pub total: u64     
}
 


const ALL_PASS : Symbol = symbol_short!("ALL_PASS");



#[contracttype] 
pub enum Adminbook { 
    Admincontrol(u64)
}



#[contracttype]
#[derive(Clone)] 
pub struct Admincontrol {
    pub ac_id: u64,   
    pub out_time: u64, 
    pub approval: bool, 
}  



#[contracttype] 
pub enum Passbook { 
    Pass(u64)
}

const COUNT_PASS: Symbol = symbol_short!("C_PASS"); 



#[contracttype]
#[derive(Clone)] 
pub struct Pass {
    pub unique_id: u64,
    pub title: String,
    pub descrip: String,
    pub crt_time: u64, 
    pub in_time: u64,
    pub isexpired: bool,   
}  


#[contract]
pub struct GatePassContract;

#[contractimpl]
impl GatePassContract {

    
    pub fn create_pass(env: Env, title: String, descrip: String) -> u64 {
        let mut count_pass: u64 = env.storage().instance().get(&COUNT_PASS).unwrap_or(0);
            count_pass += 1;
        
    
        let mut records = Self::view_my_pass(env.clone(), count_pass.clone());   
        
        let ap_records = Self::view_ac_pass_by_unique_id(env.clone(), count_pass.clone());

    
        if records.isexpired == true && ap_records.approval == false {
            
    
            
            let time = env.ledger().timestamp();
    
            let mut all_pass = Self::view_all_pass_status(env.clone()); 
    
                
                records.title = title;
                records.descrip = descrip;
                records.crt_time = time;
                records.isexpired = false;
            
                
                all_pass.pending += 1;
                all_pass.total = all_pass.total + 1;

                records.unique_id = all_pass.total.clone();
                
                
                env.storage().instance().set(&Passbook::Pass(records.unique_id.clone()), &records);

        
                env.storage().instance().set(&ALL_PASS, &all_pass);
                
                env.storage().instance().set(&COUNT_PASS, &count_pass);
    
                env.storage().instance().extend_ttl(5000, 5000);

            log!(&env, "Pass Created with Pass-ID: {}", records.unique_id.clone());

            return records.unique_id.clone(); 
                
        } else {
            count_pass -= 1;
            env.storage().instance().set(&COUNT_PASS, &count_pass);
            log!(&env, "You can't create a pass! You already have a pending pass");
            panic!("You can't create a pass!");
        }
    }

    pub fn approve_pass (env: Env, ac_id: u64) {

        let mut ap_records = Self::view_ac_pass_by_unique_id(env.clone(), ac_id.clone());     
        
        let records = Self::view_my_pass(env.clone(), ac_id.clone()); 
        
        
        if ap_records.approval == false && ac_id.clone() <= records.unique_id.clone() {
            let time = env.ledger().timestamp(); 
            
            
            ap_records.ac_id = ac_id;
            ap_records.approval = true;
            ap_records.out_time = time;

            let mut all_status = Self::view_all_pass_status(env.clone()); 
            all_status.approved += 1; 
            all_status.pending -= 1;  
            
            
            env.storage().instance().set(&ALL_PASS, &all_status);

            
            env.storage().instance().set(&Adminbook::Admincontrol(ac_id.clone()), &ap_records);
            
            env.storage().instance().extend_ttl(5000, 5000);

            log!(&env, "Pass-ID: {}, is now Approved", ac_id);
        } else {
            log!(&env, "Cannot Approved!!");
            panic!("Cannot Approved!!")
        } 
    }

    pub fn expire_pass (env: Env, unique_id: u64) {

        let ap_records = Self::view_ac_pass_by_unique_id(env.clone(), unique_id.clone()); 
       
        let mut records = Self::view_my_pass(env.clone(), unique_id.clone());   

        if ap_records.approval == true && records.isexpired == false {
            let time = env.ledger().timestamp();
            
            records.isexpired = true;
            records.in_time = time;

            let mut all_pass = Self::view_all_pass_status(env.clone());
            all_pass.expired += 1; 

            
            env.storage().instance().set(&ALL_PASS, &all_pass);
            
            env.storage().instance().set(&Passbook::Pass(unique_id.clone()), &records);
            
            env.storage().instance().extend_ttl(5000, 5000);
            
            log!(&env, "Pass-ID: {}, is now Expired!!", unique_id);
        } else {
            
            log!(&env, "Either you haven't created your pass, or your pass is not approved yet, or your pass is already expired!!!!");
            panic!("Either you haven't created your pass, or your pass is not approved yet, or your pass is already expired!!");
        } 
    }
    
    
    
    pub fn view_all_pass_status (env: Env) -> ApprovalStatus {    
        
        env.storage().instance().get(&ALL_PASS).unwrap_or(ApprovalStatus {
            
            approved: 0,
            pending: 0,
            expired: 0,
            total: 0
        })
    }


    
    pub fn view_my_pass(env: Env, uniqueid: u64) -> Pass {
        
        let key = Passbook::Pass(uniqueid.clone()); 
        
        env.storage().instance().get(&key).unwrap_or(Pass {
           
            unique_id: 0,
            title: String::from_str(&env, "Not_Found"),
            descrip: String::from_str(&env, "Not_Found"),
            crt_time: 0,
            in_time: 0,
            isexpired: true, 
        })
    }


    
    pub fn view_ac_pass_by_unique_id(env: Env, unique_id: u64) -> Admincontrol {
        
        let ac_key = Adminbook::Admincontrol(unique_id.clone()); 
        
        env.storage().instance().get(&ac_key).unwrap_or(Admincontrol {
           
            ac_id: 0,
            out_time: 0,
            approval: false,
        })
    }
}
