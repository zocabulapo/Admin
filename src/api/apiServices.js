import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("Authentication")}`
  },
}

localStorage.setItem('Authentication', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InN1YiI6IjY0M2FlZjA3Yzk2ZTBiY2NlZDhiZTYyNCIsImVtYWlsIjoibmd1eWVudm83MDlAZ21haWwuY29tIiwicGVybWlzc2lvbiI6IlFBTWFuYWdlciJ9LCJpYXQiOjE2ODE2NjcxNzMsImV4cCI6MTY4MTcxMDM3M30.fETcPT9E8cLiGYWXIckJR2fQAe5_sOa_4vEJnbLsmso");
axios.defaults.headers.common['Authorization'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InN1YiI6IjY0M2FlZjA3Yzk2ZTBiY2NlZDhiZTYyNCIsImVtYWlsIjoibmd1eWVudm83MDlAZ21haWwuY29tIiwicGVybWlzc2lvbiI6IlFBTWFuYWdlciJ9LCJpYXQiOjE2ODE2NjcxNzMsImV4cCI6MTY4MTcxMDM3M30.fETcPT9E8cLiGYWXIckJR2fQAe5_sOa_4vEJnbLsmso";

const addTag = async (data) => {
  return await axios.post("http://localhost:8080/tags", data, config)
    .then(res => {
        return res.data
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.data.message);
      }
    })
}

const getAllTags = async () => {
  return await axios.get("http://localhost:8080/tags", config)
    .then(res => {
        return res?.data
    })
    .catch(err => {
        console.log(err)
    })
}

const updateTag = async (tagID, data) => {
  return await axios.put(`http://localhost:8080/tags/${tagID}`, data, config)
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

const deleteTag = async (tagID) => {
  return await axios.delete(`http://localhost:8080/tags/${tagID}`, config)
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err)
    })
}

const getUsers = async () => {
  return await axios.get("http://localhost:8080/users", config)
    .then(res => {
        return res?.data
    })
    .catch(err => {
        console.log(err)
    })
}

const addUser = async (data) => {
  return await axios.post("http://localhost:8080/users", data, config)
    .then(res => {
      return res.data;
    })
    .catch(err  => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.data.message);
      }
    });
}

const updateUser = async (id, data) => {
  return await axios.put(`http://localhost:8080/users/${id}`, data, config)
  .then(res => {
    return res.data;
  })
  .catch(error => {
    console.log(error);
  });
}

const deleteUser = async (id) => {
  return await axios.delete(`http://localhost:8080/users/${id}`, config)
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
    })
}

const getAllIdeas = async () => {
  return await axios.get("http://localhost:8080/ideas", config)
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

const getIdea = async (id) => {
  return await axios.get(`http://localhost:8080/ideas/${id}`, config)
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err)
    })
}

const deleteIdea = async (id) => {
  return await axios.delete(`http://localhost:8080/ideas/${id}`, config)
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err)
    })
}

const getIdeaByTagID = async (id) => {
  return await axios.get(`http://localhost:8080/ideas/ideasByTag/${id}`, config)
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

export {
    getAllTags,
    addTag,
    deleteTag,
    updateTag,
    addUser,
    getUsers,
    deleteUser,
    updateUser,
    getAllIdeas,
    deleteIdea,
    getIdea,
    getIdeaByTagID
}