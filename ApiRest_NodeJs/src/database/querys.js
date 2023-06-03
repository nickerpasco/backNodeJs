export const querys = {
  getAllProducts: "SELECT TOP(500) * FROM [Products]",
  getProducById: "SELECT * FROM Products Where Id = @Id",
  addNewProduct:
    "INSERT INTO Products (name, description, quantity) VALUES (@name,@description,@quantity);",
  deleteProduct: "DELETE FROM Products WHERE Id= @Id",
  getTotalProducts: "SELECT COUNT(*) FROM Products",
  updateProductById:
    "UPDATE Products SET Name = @name, Description = @description, Quantity = @quantity WHERE Id = @id",
};
