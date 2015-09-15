using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CalorieCounter.API.Models;

namespace CalorieCounter.API.Controllers
{
    [Authorize]
    public class MealsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Meals
        [Authorize(Roles = "Administrator")]
        public IQueryable<Meal> GetMeals()
        {
            return db.Meals;
        }

        // GET: api/Meals/Group
        [HttpGet]
        [Route("api/Meals/Group")]
        public IHttpActionResult GroupMeals()
        {

            var meals = db.Meals.Where(x => x.ApplicationUser.UserName == User.Identity.Name)
             .OrderByDescending(x => x.DateTime)
             .GroupBy(x => new { x.Year, x.Month, x.Day })
             .GroupBy(x => new { x.Key.Year, x.Key.Month, x.Key.Day })
             .GroupBy(x => new { x.Key.Year, x.Key.Month })
             .GroupBy(x => x.Key.Year);

            return Ok(meals);
        }


        // POST: api/Meals/Filter
        [HttpPost]
        [Route("api/Meals/Filter")]
        [ResponseType(typeof(Meal))]
        public IHttpActionResult FilterMeals([FromBody] MealFilter mealFilter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var meals = db.Meals.Where(x => x.ApplicationUser.UserName == User.Identity.Name)
                .Where(x => DbFunctions.TruncateTime(x.DateTime) >= DbFunctions.TruncateTime(mealFilter.startDate)
                && DbFunctions.TruncateTime(x.DateTime) <= DbFunctions.TruncateTime(mealFilter.endDate)
                && x.DateTime.Hour >= mealFilter.startHour
                && x.DateTime.Hour <= mealFilter.endHour)
                .OrderByDescending(x => DbFunctions.TruncateTime(x.DateTime))
        .GroupBy(x => new { x.Year, x.Month, x.Day })
        .GroupBy(x => new { x.Key.Year, x.Key.Month, x.Key.Day })
        .GroupBy(x => new { x.Key.Year, x.Key.Month })
        .GroupBy(x => x.Key.Year);

            return Ok(meals);
        }


        // GET: api/Meals/5
        [ResponseType(typeof(Meal))]
        public IHttpActionResult GetMeal(int id)
        {
            Meal meal = db.Meals.Find(id);
            if (meal == null)
            {
                return NotFound();
            }
            // Only Administrator or the owner of this meal may manipulate it
            var user = db.Users.Where(x => x.UserName == User.Identity.Name).Single();
            if (!User.IsInRole("Administrator") && user.Id != meal.ApplicationUserId)
            {
                return BadRequest();
            }

            return Ok(meal);
        }

        // PUT: api/Meals/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMeal(int id, Meal meal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != meal.MealId)
            {
                return BadRequest();
            }

            // Only Administrator or the owner of this meal may manipulate it
            var user = db.Users.Where(x => x.UserName == User.Identity.Name).Single();
            if(!User.IsInRole("Administrator")&&user.Id!=meal.ApplicationUserId)
            {
                return BadRequest();
            }

            meal.Year = meal.DateTime.Year;
            meal.Month = meal.DateTime.Month;
            meal.Day = meal.DateTime.Day;


            db.Entry(meal).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MealExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Meals
        [ResponseType(typeof(Meal))]
        public IHttpActionResult PostMeal(Meal meal)
        {
            var user = db.Users.Where(x => x.UserName == User.Identity.Name).Single();
            meal.Year = meal.DateTime.Year;
            meal.Month = meal.DateTime.Month;
            meal.Day = meal.DateTime.Day;

            user.Meals.Add(meal);
           
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = meal.MealId }, meal);
        }

        // DELETE: api/Meals/5
        [ResponseType(typeof(Meal))]
        public IHttpActionResult DeleteMeal(int id)
        {
        
            Meal meal = db.Meals.Find(id);
            if (meal == null)
            {
                return NotFound();
            }
            // Only Administrator or the owner of this meal may manipulate it
            var user = db.Users.Where(x => x.UserName == User.Identity.Name).Single();
            if (!User.IsInRole("Administrator") && user.Id != meal.ApplicationUserId)
            {
                return BadRequest();
            }

            db.Meals.Remove(meal);
            db.SaveChanges();

            return Ok(meal);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MealExists(int id)
        {
            return db.Meals.Count(e => e.MealId == id) > 0;
        }
    }
}