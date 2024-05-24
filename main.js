const getTodayCourses = require("./scripts/getTodayCourses");
const getDayCourses = require("./scripts/getDayCourses");
const getDateCourses = require("./scripts/getDateCourses");
const getCoursesData = require("./scripts/getCoursesData");

function getCourseByDayOrDate(query) {
  var courses = getCoursesData();
  if (!query || query.trim() === "") {
    return getTodayCourses(new Date(), courses);
  }

  var daysOfWeek = [
    "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"
  ];

  var today = new Date();
  var tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  var dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  switch (query) {
    case "今天":
      return getTodayCourses(today, courses);
    case "明天":
      return getDayCourses(daysOfWeek[tomorrow.getDay()], courses, 24); // 返回明天全天的课程
    case "后天":
      return getDayCourses(daysOfWeek[dayAfterTomorrow.getDay()], courses, 24); // 返回后天全天的课程
    default:
      var dayIndex = daysOfWeek.indexOf(query);
      if (dayIndex !== -1) {
        return getDayCourses(daysOfWeek[dayIndex], courses, 16); // 返回全天课程
      } else {
        return getDateCourses(query, courses);
      }
  }
}

let result = "";

const params = $context.query;

if (params && "日期" in params) {
  result = getCourseByDayOrDate(params.日期);
} else {
  result = "未传入日期";
}

$intents.finish(result);