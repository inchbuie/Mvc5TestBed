using ParentChild.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParentChild.DataLayer
{
    public static class DataLayerHelpers
    {
        /// <summary>
        /// Converts between our custom client-side object state 
        ///  (added/modified/deleted/unchanged)
        ///   and EF's native entity state
        /// </summary>
        /// <param name="objectState"></param>
        /// <returns></returns>
        public static EntityState ConvertState(ObjectState objectState)
        {
            var state = new EntityState();
            switch (objectState)
            {
                case ObjectState.Added:
                    state = EntityState.Added;
                    break;
                case ObjectState.Modified:
                    state = EntityState.Modified;
                    break;
                case ObjectState.Deleted:
                    state = EntityState.Deleted;
                    break;
                case ObjectState.Unchanged:
                default:
                    state = EntityState.Unchanged;
                    break;
            }
            return state;
        }

        /// <summary>
        /// extension method to apply state changes to child entities for objects
        ///   for which we are manually tracking state changes
        /// </summary>
        /// <param name="context"></param>
        public static void ApplyStateChanges(this DbContext context)
        {
            foreach (var entry in context.ChangeTracker.Entries<IObjectWithState>())
            {
                var state = entry.Entity;
                entry.State = ConvertState(state.ObjectState);
            }
        }
    }
}
