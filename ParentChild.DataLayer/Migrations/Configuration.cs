namespace ParentChild.DataLayer.Migrations
{
    using ParentChild.Model;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ParentChild.DataLayer.SalesContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(ParentChild.DataLayer.SalesContext context)
        {
            //  This method will be called after migrating to the latest version.
            context.SalesOrders.AddOrUpdate(
                so => so.CustomerName,
                new SalesOrder
                {
                    CustomerName = "Kim",
                    PONumber = "9876",
                    Items =
                    {
                        new SalesOrderItem{ProductCode="ABC", Quantity=10, UnitPrice=1.44m}
                        ,new SalesOrderItem{ProductCode="xyz", Quantity=7, UnitPrice=45.57m}
                        ,new SalesOrderItem{ProductCode="vinyl discs", Quantity=6, UnitPrice=14.99m}
                    }
                },
                new SalesOrder { CustomerName = "Alexandra" },
                new SalesOrder { CustomerName = "Andrea", PONumber = "Red #9" }
                );
        }
    }
}
