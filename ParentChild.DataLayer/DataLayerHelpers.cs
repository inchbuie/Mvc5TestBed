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
    }
}
