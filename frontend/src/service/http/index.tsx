import { ApprovedCourseInterface } from "../../interface/IApprovedCourse";
import { DisDescription } from "../../interface/IDisDescription";
const apiUrl = "http://localhost:8080";

// GetAllCourse
async function GetCourse() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/courses`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
}

async function GetCourseApproved() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/courseApproved`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
}

async function GetCourseByID(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };
  let res = await fetch(`${apiUrl}/course/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
}

async function GetCourseByIDwantName() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/courseReq`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
}

async function GetTeacherById(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };
  let res = await fetch(`${apiUrl}/teachers/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
}

async function CreateApprove(data: ApprovedCourseInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/Approve`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });
  return res;
}

async function GetContentByID(id: Number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/content/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function UpdateStatusApproveOld(id: Number | undefined) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  };

  let res = await fetch(`${apiUrl}/status/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });
  return res;
}

async function UpdateStatusApprove(id: Number | undefined) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id })
  };

  try {
    let response = await fetch(`${apiUrl}/statusAp/${id}`, requestOptions);
    let res = await response.json();

    if (response.ok) {
      return { status: true, message: res.data };
    } else {
      return { status: false, message: res.error };
    }
  } catch (error) {
    return { status: false, message: "เกิดข้อผิดพลาดในการสื่อสารกับเซิร์ฟเวอร์" };
  }
}

// async function UpdateStatusDisapprove(id: Number | undefined) {
//   const requestOptions = {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ id: id })
//   };

//   try {
//     let response = await fetch(`${apiUrl}/statusDis/${id}`, requestOptions);
//     let res = await response.json();

//     if (response.ok) {
//       return { status: true, message: res.data };
//     } else {
//       return { status: false, message: res.error };
//     }
//   } catch (error) {
//     return { status: false, message: "เกิดข้อผิดพลาดในการสื่อสารกับเซิร์ฟเวอร์" };{data.Course_ID}
//   }
// }

async function UpdateStatusDisapprove(data: DisDescription) { // รับ data แทน id
  const updateData = {
    Description: data.Description,
    Course_ID: data.Course_ID,
  }
  // const timestamp = new Date();

  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData), // ส่งเฉพาะข้อมูลที่ต้องการอัปเดต
  };

  try {
    let response = await fetch(`${apiUrl}/statusDis`, requestOptions);
    let res = await response.json();

    if (response.ok) {
      return { status: true, message: res.data };
    } else {
      return { status: false, message: res.error };
    }
  } catch (error) {
    return { status: false, message: "เกิดข้อผิดพลาดในการสื่อสารกับเซิร์ฟเวอร์" };
  }
}


async function GetApproved() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/approved`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function Getisapproved() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/disapproved`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
}

export {
  GetCourse,  
  GetCourseByID,
  GetCourseByIDwantName,
  GetTeacherById,
  CreateApprove,
  GetContentByID,
  GetCourseApproved,
  UpdateStatusApproveOld,
  GetApproved,
  Getisapproved,
  UpdateStatusApprove,
  UpdateStatusDisapprove,
};