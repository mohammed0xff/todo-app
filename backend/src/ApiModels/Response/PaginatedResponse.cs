using System.Collections.Generic;

namespace TodoAPI.ApiModels.Response
{
    public class PaginatedResponse<T>
    {
        public int TotalRecords { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public List<T> Data { get; set; }
    }
}
