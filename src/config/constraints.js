import { ReactComponent as HomeSvg } from "../assets/svg/home.svg";
import { ReactComponent as CreateSvg } from "../assets/svg/create_quiz.svg"
import { ReactComponent as TrueSvg } from '../assets/svg/true.svg'
import { ReactComponent as BookSvg } from '../assets/svg/book.svg'
import { ReactComponent as TrashBinSvg } from "../assets/svg/trash_bin.svg";
import { ReactComponent as DeleteSvg } from "../assets/svg/delete.svg";
import { ReactComponent as CorrectChoiceSvg } from "../assets/svg/correct_choice.svg";
import { ReactComponent as InCorrectChoiceSvg } from "../assets/svg/incorrect_choice.svg";
import { ReactComponent as ChangePassword } from '../assets/svg/change_password.svg'
import { ReactComponent as ThinkingSvg } from '../assets/svg/thinking.svg'
import { ReactComponent as ExactlyActiveSvg } from "../assets/svg/exactly.svg";
import { ReactComponent as WhatHappenSvg } from '../assets/svg/what_happen.svg'
import { ReactComponent as UserSvg } from "../assets/svg/user.svg";
import { ReactComponent as TaskSvg } from "../assets/svg/task.svg";
import { ReactComponent as CodeQuizSvg } from "../assets/svg/code_quiz.svg";
import { ReactComponent as HideSvg } from "../assets/svg/hide.svg";
import { ReactComponent as ShowSvg } from "../assets/svg/show.svg";
import { ReactComponent as TimerWhiteSvg } from "../assets/svg/timer_white.svg";
import { ReactComponent as ActivitySvg } from "../assets/svg/activity.svg";
import { ReactComponent as LogoSvg } from "../assets/svg/logo.svg";
import { ReactComponent as GoogleSvg } from "../assets/svg/google.svg";
import { ReactComponent as EmailSvg } from "../assets/svg/email.svg";
import { ReactComponent as CreateUserSvg } from "../assets/svg/create__user.svg";
import { ReactComponent as AddButtonSvg } from "../assets/svg/add_button.svg";
import { ReactComponent as NextSvg } from "../assets/svg/next.svg";
import { ReactComponent as PointsSvg } from "../assets/svg/points.svg";
import { ReactComponent as CategorySvg } from "../assets/svg/category.svg";
import { ReactComponent as ContainsSvg } from "../assets/svg/contains.svg";
import { ReactComponent as SaveQuizSvg } from "../assets/svg/save_quiz.svg";
import { ReactComponent as BackSvg } from "../assets/svg/back.svg";
import { ReactComponent as QuestionSvg } from "../assets/svg/question.svg";
import { ReactComponent as FindQuizSvg } from "../assets/svg/find_quiz.svg";
import { ReactComponent as TimerBlueSvg } from "../assets/svg/timer_blue.svg";
import { ReactComponent as EditUserSvg } from "../assets/svg/edit_user.svg";
import { ReactComponent as SecuritySvg } from "../assets/svg/security.svg";
import { ReactComponent as NotFoundSvg } from "../assets/svg/notfound.svg";
import { ReactComponent as ErrorSvg } from "../assets/svg/error.svg";
import { ReactComponent as SuccessSvg } from "../assets/svg/succses.svg";
import { ReactComponent as TimeUpSvg } from "../assets/svg/time_up.svg";
import { ReactComponent as ImageSvg } from "../assets/svg/image.svg";
import { ReactComponent as TaskDoneSvg } from "../assets/svg/task_done.svg";
import { ReactComponent as TrueWhiteSvg } from "../assets/svg/true_white.svg";
import { ReactComponent as DateSvg } from '../assets/svg/date.svg'
import { ReactComponent as TrueGreen } from '../assets/svg/true_green.svg';
import { ReactComponent as GreenBoxSvg } from '../assets/svg/green_box.svg';
import { ReactComponent as RedBoxSvg } from '../assets/svg/red_box.svg';
import { ReactComponent as GreenCircle } from '../assets/svg/green_circle.svg';
import { ReactComponent as RedCircle } from '../assets/svg/red_circle.svg';
import { ReactComponent as SelectedIconSvg } from '../assets/svg/selected_icon.svg';
import { ReactComponent as Summarized } from "../assets/svg/summarized.svg"; 
import { ReactComponent as Deployed } from "../assets/svg/deployed.svg";
import { ReactComponent as Participants } from "../assets/svg/participants.svg";
import { ReactComponent as SortArrow } from "../assets/svg/sort_arrow.svg";
import { ReactComponent as QuestionGrey } from "../assets/svg/question_gray.svg";


export const onErrorProfileImageUrl = "https://media.discordapp.net/attachments/1115338683671908462/1118152638756827166/image.png"
export const onErrorQuizImageUrl = "https://media.discordapp.net/attachments/1115338683671908462/1118138703580237844/image.png";
export const anonymousFullName = "Anonymous User";
export const anonymousQuizName = "Anonymous Quiz";
export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const choiceTypeMap = {
    'single-choice': "Single Choice",
    'multiple-choice': "Multiple Choice",
    'fill-choice': "Fill Choice",
}

export const choiceTypeEnum = {
    SINGLE_CHOICE: "single-choice",
    MULTIPLE_CHOICE: "multiple-choice",
    FILL_CHOICE: "fill-choice",
}

export const fillChoiceEnum = {
    IS_EXACTLY: "is-exactly",
    CONTAINS: "contains",
}

export const explanationAnswerTypeMap = {
    'single-choice': "Allows selecting only one option.",
    'multiple-choice': "Allows selecting multiple options.",
    'fill-choice': `Requires filling in missing information. it can have subtypes\nLike \"Is Exactly\" and \"Contains\" for determining matching criteria.`,
}

export const svgMap = {
    home: <HomeSvg />,
    book: <BookSvg />,
    true: <TrueSvg />,
    created: <CreateSvg />,
    trash_bin: <TrashBinSvg />,
    delete: <DeleteSvg />,
    correct_choice: <CorrectChoiceSvg />,
    incorrect_choice: <InCorrectChoiceSvg />,
    change_password: <ChangePassword />,
    thinking: <ThinkingSvg />,
    exactly: <ExactlyActiveSvg />,
    what_happen: <WhatHappenSvg />,
    user: <UserSvg />,
    task: <TaskSvg />,
    code_quiz: <CodeQuizSvg />,
    hide: <HideSvg />,
    show: <ShowSvg />,
    timer_white: <TimerWhiteSvg />,
    timer_blue: <TimerBlueSvg />,
    activity: <ActivitySvg />,
    logo: <LogoSvg />,
    google: <GoogleSvg />,
    email: <EmailSvg />,
    create__user: <CreateUserSvg />,
    add_button: <AddButtonSvg />,
    next: <NextSvg />,
    points: <PointsSvg />,
    category: <CategorySvg />,
    contains: <ContainsSvg />,
    save_quiz: <SaveQuizSvg />,
    back: <BackSvg />,
    question: <QuestionSvg />,
    find_quiz: <FindQuizSvg />,
    edit_user: <EditUserSvg />,
    security: <SecuritySvg />,
    not_found: <NotFoundSvg />,
    error: <ErrorSvg/>,
    success: <SuccessSvg/>,
    time_up: <TimeUpSvg/>,
    image: <ImageSvg/>,
    task_done: <TaskDoneSvg/>,
    true_white: <TrueWhiteSvg/>,
    date: <DateSvg/>,
    true_green: <TrueGreen/>,
    green_box: <GreenBoxSvg/>,
    red_box: <RedBoxSvg/>,
    green_circle: <GreenCircle/>,
    red_circle: <RedCircle/>,
    selected_icon: <SelectedIconSvg/>,
    summarized: <Summarized/>,
    deployed: <Deployed/>,
    participants: <Participants/>,
    sortArrow: <SortArrow/>,
    questionGrey: <QuestionGrey/>
}