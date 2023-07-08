// import LoginScreen from "../../../../Components/Pages/Authentication/LoginScreen.jsx";
// import {render} from "../../../utils/test-utils.js";
// import {MemoryRouter} from "react-router-dom";
// import {SecurityProvider} from "../../../../Context/SecurityContext";

// describe('LoginScreen Tests', () => {

//     test('should render <LoginScreen/>', () => {
//         render(
//             <SecurityProvider>
//                 <MemoryRouter>
//                     <LoginScreen/>
//                 </MemoryRouter>
//             </SecurityProvider>
//         );
//     })

//     test('should have a div with login_background_top className', () => {
//         const {container} = render(
//             <SecurityProvider>
//                 <MemoryRouter>
//                     <LoginScreen/>
//                 </MemoryRouter>
//             </SecurityProvider>
//         );
//         expect(container.querySelector('.login_background_top')).toBeDefined();
//     })

//     test('should have a div with login_background_bottom className', () => {
//         const {container} = render(
//             <SecurityProvider>
//                 <MemoryRouter>
//                     <LoginScreen/>
//                 </MemoryRouter>
//             </SecurityProvider>
//         );
//         expect(container.querySelector('.login_background_bottom')).toBeDefined();
//     })
// })