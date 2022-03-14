/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Blog = require('../model/Blog');
let Master = require('../model/Master');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteBlog = async (filter) =>{
  try {
    return await Blog.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMaster = async (filter) =>{
  try {
    let master = await Master.find(filter, { _id:1 });
    if (master.length){
      master = master.map((obj) => obj._id);
      const MasterFilter0752 = { 'parentId': { '$in': master } };
      const Master2039 = await deleteMaster(MasterFilter0752);
      return await Master.deleteMany(filter);
    } else {
      return 'No Master found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter5940 = { 'updatedBy': { '$in': user } };
      const Blog3241 = await deleteBlog(BlogFilter5940);
      const BlogFilter7404 = { 'addedBy': { '$in': user } };
      const Blog5984 = await deleteBlog(BlogFilter7404);
      const MasterFilter6977 = { 'updatedBy': { '$in': user } };
      const Master5816 = await deleteMaster(MasterFilter6977);
      const MasterFilter5268 = { 'addedBy': { '$in': user } };
      const Master1638 = await deleteMaster(MasterFilter5268);
      const userFilter5516 = { 'addedBy': { '$in': user } };
      const user6869 = await deleteUser(userFilter5516);
      const userFilter5334 = { 'updatedBy': { '$in': user } };
      const user5568 = await deleteUser(userFilter5334);
      const userTokensFilter3886 = { 'userId': { '$in': user } };
      const userTokens1533 = await deleteUserTokens(userTokensFilter3886);
      const userTokensFilter9319 = { 'addedBy': { '$in': user } };
      const userTokens0974 = await deleteUserTokens(userTokensFilter9319);
      const userTokensFilter2045 = { 'updatedBy': { '$in': user } };
      const userTokens6716 = await deleteUserTokens(userTokensFilter2045);
      const roleFilter1999 = { 'addedBy': { '$in': user } };
      const role5200 = await deleteRole(roleFilter1999);
      const roleFilter8423 = { 'updatedBy': { '$in': user } };
      const role8028 = await deleteRole(roleFilter8423);
      const projectRouteFilter4496 = { 'addedBy': { '$in': user } };
      const projectRoute9427 = await deleteProjectRoute(projectRouteFilter4496);
      const projectRouteFilter9143 = { 'updatedBy': { '$in': user } };
      const projectRoute9797 = await deleteProjectRoute(projectRouteFilter9143);
      const routeRoleFilter6486 = { 'addedBy': { '$in': user } };
      const routeRole4965 = await deleteRouteRole(routeRoleFilter6486);
      const routeRoleFilter6073 = { 'updatedBy': { '$in': user } };
      const routeRole8597 = await deleteRouteRole(routeRoleFilter6073);
      const userRoleFilter5297 = { 'userId': { '$in': user } };
      const userRole6940 = await deleteUserRole(userRoleFilter5297);
      const userRoleFilter3456 = { 'addedBy': { '$in': user } };
      const userRole0735 = await deleteUserRole(userRoleFilter3456);
      const userRoleFilter7534 = { 'updatedBy': { '$in': user } };
      const userRole4114 = await deleteUserRole(userRoleFilter7534);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter0369 = { 'roleId': { '$in': role } };
      const routeRole8590 = await deleteRouteRole(routeRoleFilter0369);
      const userRoleFilter3387 = { 'roleId': { '$in': role } };
      const userRole9424 = await deleteUserRole(userRoleFilter3387);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter3649 = { 'routeId': { '$in': projectroute } };
      const routeRole1571 = await deleteRouteRole(routeRoleFilter3649);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
        
    const BlogCnt =  await Blog.countDocuments(filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countMaster = async (filter) =>{
  try {
        
    let master = await Master.find(filter, { _id:1 });
    if (master.length){
      master = master.map((obj) => obj._id);

      const MasterFilter = { '$or': [{                    parentId : { '$in' : master } }] };
      const MasterCnt =  await dbService.countDocument(Master,MasterFilter);

      let response = { Master : MasterCnt, };
      return response;
    } else {
      return {  master : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const BlogFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const BlogCnt =  await dbService.countDocument(Blog,BlogFilter);

      const MasterFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const MasterCnt =  await dbService.countDocument(Master,MasterFilter);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        Blog : BlogCnt,
        Master : MasterCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Blog.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMaster = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let master = await Master.find(filter, { _id:1 });
    if (master.length){
      master = master.map((obj) => obj._id);
      const MasterFilter2459 = { 'parentId': { '$in': master } };
      const Master8436 = await softDeleteMaster(MasterFilter2459, updateBody);
      return await Master.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No Master found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter3042 = { 'updatedBy': { '$in': user } };
      const Blog9574 = await softDeleteBlog(BlogFilter3042, updateBody);
      const BlogFilter7195 = { 'addedBy': { '$in': user } };
      const Blog6642 = await softDeleteBlog(BlogFilter7195, updateBody);
      const MasterFilter1435 = { 'updatedBy': { '$in': user } };
      const Master7356 = await softDeleteMaster(MasterFilter1435, updateBody);
      const MasterFilter9898 = { 'addedBy': { '$in': user } };
      const Master2838 = await softDeleteMaster(MasterFilter9898, updateBody);
      const userFilter8942 = { 'addedBy': { '$in': user } };
      const user3346 = await softDeleteUser(userFilter8942, updateBody);
      const userFilter4323 = { 'updatedBy': { '$in': user } };
      const user3168 = await softDeleteUser(userFilter4323, updateBody);
      const userTokensFilter7788 = { 'userId': { '$in': user } };
      const userTokens2947 = await softDeleteUserTokens(userTokensFilter7788, updateBody);
      const userTokensFilter5439 = { 'addedBy': { '$in': user } };
      const userTokens7144 = await softDeleteUserTokens(userTokensFilter5439, updateBody);
      const userTokensFilter7594 = { 'updatedBy': { '$in': user } };
      const userTokens1941 = await softDeleteUserTokens(userTokensFilter7594, updateBody);
      const roleFilter4310 = { 'addedBy': { '$in': user } };
      const role2119 = await softDeleteRole(roleFilter4310, updateBody);
      const roleFilter0619 = { 'updatedBy': { '$in': user } };
      const role0549 = await softDeleteRole(roleFilter0619, updateBody);
      const projectRouteFilter8064 = { 'addedBy': { '$in': user } };
      const projectRoute9982 = await softDeleteProjectRoute(projectRouteFilter8064, updateBody);
      const projectRouteFilter9316 = { 'updatedBy': { '$in': user } };
      const projectRoute6922 = await softDeleteProjectRoute(projectRouteFilter9316, updateBody);
      const routeRoleFilter9413 = { 'addedBy': { '$in': user } };
      const routeRole3730 = await softDeleteRouteRole(routeRoleFilter9413, updateBody);
      const routeRoleFilter3078 = { 'updatedBy': { '$in': user } };
      const routeRole9658 = await softDeleteRouteRole(routeRoleFilter3078, updateBody);
      const userRoleFilter3356 = { 'userId': { '$in': user } };
      const userRole8007 = await softDeleteUserRole(userRoleFilter3356, updateBody);
      const userRoleFilter5830 = { 'addedBy': { '$in': user } };
      const userRole8369 = await softDeleteUserRole(userRoleFilter5830, updateBody);
      const userRoleFilter4698 = { 'updatedBy': { '$in': user } };
      const userRole5239 = await softDeleteUserRole(userRoleFilter4698, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter7846 = { 'roleId': { '$in': role } };
      const routeRole6595 = await softDeleteRouteRole(routeRoleFilter7846, updateBody);
      const userRoleFilter1294 = { 'roleId': { '$in': role } };
      const userRole5842 = await softDeleteUserRole(userRoleFilter1294, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter5879 = { 'routeId': { '$in': projectroute } };
      const routeRole6514 = await softDeleteRouteRole(routeRoleFilter5879, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteBlog,
  deleteMaster,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countBlog,
  countMaster,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteBlog,
  softDeleteMaster,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
