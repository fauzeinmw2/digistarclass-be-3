// npm install mongoose uuid

const repositories = require('../repositories/role_repository');
const { v4: uuidv4 } = require('uuid');


// Function to create a new role
const create = async (roleData) => {
    try {
        const roleId = uuidv4();
        const role = {
            role_id: roleId,
            ...roleData
        };
        const createdRole = await repositories.create(role);
        return createdRole;
    } catch (error) {
        throw new Error('Failed to create role');
    }
};

// Function to get list of roles
const getList = async () => {
    try {
        const roles = await repositories.findAll();
        return roles;
    } catch (error) {
        throw new Error('Failed to get list of roles');
    }
}

const getById = async (roleId) => {
    try {
        const role = await repositories.getOneByRoleId(roleId);

        if (!role) {
            throw new Error('Role not found');
        } 

        return role;
    } catch (error) {
        throw new Error(`Failed to get role with ID ${roleId}`);
    }
}

async function updateOne(updateData) {
    try {
        const roleId = updateData.role_id;
        const updatedRole = await repositories.updateOne(roleId, updateData);

        return updatedRole;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteOne = async (roleId) => {
    try {
        const deletedRole = await repositories.deleteOne(roleId);
        return deletedRole;
    } catch (error) {
        throw new Error(`Failed to delete role with ID ${roleId}`);
    }
}

module.exports = { create, getList, getById, updateOne, deleteOne };