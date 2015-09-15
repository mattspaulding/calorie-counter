using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace CalorieCounter.API.Models
{
    [Bind(Exclude = "MealId")]
    public class Meal
    {
        public int MealId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        [Required]
        public int NumberOfCalories { get; set; }

        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public int Hour { get { return DateTime.Hour; } }
        public int Minute { get { return DateTime.Minute; } }
        public DayOfWeek DayOfWeek { get { return DateTime.DayOfWeek; } }
        public int DayOfYear { get { return DateTime.DayOfYear; } }
        public string MonthName { get { return DateTime.ToString("MMMM"); } }
        public string MonthNameShort { get { return DateTime.ToString("MMM"); } }
        public string DayName { get { return DateTime.ToString("dddd"); } }
        public string DayNameShort { get { return DateTime.ToString("ddd"); } }
        public string Time { get { return DateTime.ToString("h:mm t"); } }

        [Required]
        public string ApplicationUserId { get; set; }
        [JsonIgnore]
        public virtual ApplicationUser ApplicationUser { get; set; }
    }

    public class MealFilter
    {
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public int startHour { get; set; }
        public int endHour { get; set; }
    }

}
