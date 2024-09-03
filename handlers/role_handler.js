const roleUsecase = require('../domain/usecases/role_usecase');

// Handler to create a new role
async function create(req, res) {
  try {
    const { name, position, stacks } = req.body;
    if (!name || !position || !stacks) {
      return res.status(400).json({ message: "Name, Position, and Stacks are required" });
    }
    const role = { name, position, stacks };
    const newRole = await roleUsecase.create(role);
    res.status(201).json({ message: "Role created successfully", roleId: newRole.role_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get all roles
async function getList(req, res) {
  try {
    const roles = await roleUsecase.getList();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

async function getById(req, res) {
  try {
    const roleId = req.params.id;
    const role = await roleUsecase.getById(roleId);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json(role);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

async function updateOne(req, res){
  try {
    const roleId = req.params.id;
    const updateData = req.body;
    const updatedRole = await roleUsecase.updateOne({ role_id: roleId, ...updateData });
    res.json({ message: "Role updated successfully", user: updatedRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

async function deleteOne(req, res) {
  try {
    const roleId = req.params.id;
    const deletedRole = await roleUsecase.deleteOne(roleId);

    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json({ message: "Role deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

module.exports = { create, getList, getById, updateOne, deleteOne };