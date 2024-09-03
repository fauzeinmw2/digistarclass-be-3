// npm install mongoose uuid

const Role = require('../models/role_model');

// Function to save a new role
async function create(role) {
  try {

    // Create a new user
    const newRole = new Role(role);

    // Save the user to the database
    const savedRole = await newRole.save();
    return savedRole;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

// Function to get a role by role id
async function getOneByRoleId(roleId) {
    try {
        const role = await Role.findOne({ role_id: roleId });
        return role;
    } catch (error) {
        console.error('Error getting role by role_id:', error);
        throw error;
    }
}

// Function to get a role by role name
async function getOneByName(name) {
  try {
      const role = await Role.findOne({ name: name });
      return role;
  } catch (error) {
      console.error('Error getting role by role_id:', error);
      throw error;
  }
}

// Function to find all roles
async function findAll() {
  try {
    const roles = await Role.find();
    return roles;
  } catch (error) {
    console.error('Error finding roles:', error);
    throw error;
  }
}

async function updateOne(roleId, updateData) {
  try {
    const existingRole = await Role.findOne({ role_id: roleId });

    if (!existingRole) {
      throw new Error('Role not found');
    }

    delete updateData._id;
    Object.assign(existingRole, updateData);
    existingRole.updated_at = new Date();
    const updatedRole = await existingRole.save();
  
    return updatedRole;
    
  } catch (error) {
    console.error('Error updating role:', error);
    throw error;
  }
}

async function deleteOne(roleId) {
  try {
    const deletedRole = await Role.findOneAndDelete({ role_id: roleId });
    
    if (!deletedRole) {
      throw new Error('Role not found');
    }

    return deletedRole;
  } catch (error) {
    console.error('Error deleting role:', error);
    throw error;
  }
}

module.exports = { create, getOneByRoleId, getOneByName, findAll, updateOne, deleteOne };