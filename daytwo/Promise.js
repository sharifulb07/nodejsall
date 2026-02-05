// create a promise
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        console.log(`id: ${userId}, name:John Doe, email:john@example.com`);
        resolve( `id:${userId.value}, name:John Doe", email: john@example.com `);
      } else {
        reject(new Error("Invalid User. Please provide valid userid"));
      }
    }, 1000);
  });
}

// function basicPromiseExample(){
//     fetchUserData(1)
//     .then(user=>{
//         console.log("User: ", user)
//         return user.id
//     }).then(userid=>{
//         console.log("userId: ", userid)
//         return userid
//     }).catch(error=>{
//         console.log("Error :", error)
//     }).finally(()=>{
//         console.log("Finally operation complete")
//     })
// }

// basicPromiseExample()

// fetchUserData(10)
// fetchUserData(-10)
// fetchUserData(0)

// async / await with try catch

// async function fetchUserAsyncAndAwait(userid) {
//     try {
//         const user=await fetchUserData(userid)
//         console.log("This is user : ", user )
//         return user

//     } catch (error) {
//         console.log("Error occurs ", error.message)
//         throw error
//     }
//     finally{

//         console.log("Cleanup operation here ")
//     }

// }

// fetchUserAsyncAndAwait(5)

// multiple user data fetch parallel 


// async function multipleUserData(userIds) {
//   try {
//     const users = await Promise.all(userIds.map((id) => fetchUserData(id)));
//     console.log("All user data : ", users);
//     return users;
//   } catch (error) {
//     console.log("Failed to fetch all user ", error.message);
//     throw error;
//   } finally {
//     console.log("Operation complete   okay ");
//   }
// }

// multipleUserData([1,3,54,,67,78])


// async function fetchUsersWithPartialFailure(userIds) {
    
//     const results=await Promise.allSettled(
//         userIds.map((id=>fetchUserData(id)))
//     )


//     const successful=results.filter(r=>r.status=="fulfilled").map(r=>r.value)
//     const failure=results.filter(r=>r.status=="rejected").map(r=>r.value)

//     console.log("Successful : ", successful.length, "Failure : ", failure.length)
//     return {successful, failure}

// }

// fetchUsersWithPartialFailure([1,3,54,,67,78])



// Promise .race  first to complete wins 


// async function fetchUserTimeout(userid, timeoutMs){
//     const timeout=await new Promise((_, reject)=>{
//         setTimeout(()=>{
//            reject(new Error ("Fetch is timeout"))

//         }, timeoutMs)
//     })

//     return Promise.race([
//         fetchUserData(i),
//         timeout

//     ])
// }

// async function exampleWithUserTimeout(){
//     try {
//         const user =await fetchUserTimeout(3, 2000)
//         console.log("User fetched before timeout : ", user)
//     } catch (error) {
//         console.log("Error", error.message)
        
//     }
// }

// exampleWithUserTimeout()


// sequential fetch data 

async function sequentialExecution(userIds){
    console.time("Sequential Execution ")
    const users=[]

    for( const id of userIds){
        const user=await fetchUserData(id)
        users.push(user)
    }

    console.timeEnd("sequential ended")
    return users

}


// parallel fetch data
async function parallelExecution(userIds){

    console.time("parallel execution")

    const users =await Promise.all(
        userIds.map(id=> fetchUserData(id))
    )

    console.timeEnd("parallel execution ended here ")
    return users

}

sequentialExecution([8,9,6,4,7,])
parallelExecution([5,8,6,9,7])