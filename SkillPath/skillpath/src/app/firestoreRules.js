import { db } from '../../firebase'; // Adjust the path according to your project structure
import { doc, setDoc, collection } from 'firebase/firestore';

async function storeCourseData() {
    const courses = {
        "web_development": {
          "Full-Stack Web Development": {
            "Module 1 - Node.js and Express.js": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            },
            "Module 2 - Database Integration": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            },
            "Module 3 - API Development": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            },
            "Module 4 - Front-End Frameworks": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            },
            "Module 5 - Deployment and Hosting": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            },
            "Module 6 - Full-Stack Project": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            }
          },
          "Intermediate Web Development": {
            "Module 1 - Advanced HTML and CSS": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            },
            "Module 2 - JavaScript DOM Manipulation": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            },
            "Module 3 - Asynchronous Programming": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            },
            "Module 4 - Building Interactive Web Applications": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            },
            "Module 5 - Introduction to Backend Development": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            },
            "Module 6 - Full-Stack Web Development Project": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            }
          },
          "Introduction to Web Development": {
            "Module 1 - HTML Fundamentals": {
              "easiest": {
                "content": "https://ff04b520f953db4c22395e58e9d63102c2436e1db1afbca50c5d0a1-apidata.googleusercontent.com/download/storage/v1/b/learn-bucket-2820/o/web_development%2FIntroduction%20to%20Web%20Development%2FModule%201%20-%20HTML%20Fundamentals%2Feasiest%2Fcontent.json?jk=AXvcXDvPmLZAd5mSKZHmk_hsjGb6xOagP1qefKPCRJC5KE5TQbry1TlNJT5KW310pGsbUArqFBpz3b6gL_0fKiVUefiCqa4mSzSqRe95fbNedv_LY6mPKwPvpv6_sAsAP7RLNeesLcGOX0RDDh_AScUkbg6o_5m2vy1eqpmPbC8VTYCdRO3vEAA4fbV9Xlq4n_0XNFy8AgKDoQdOgclg7dyF1S7yYQvo_8tbexyIp_0GFdT7ZICB6SlmFIDlsOWJvZW37PkXjL0D8RDnVNlkj8noVSx4HcehpnPMhufycGBmFVSrnClprBMwOn7f_WhmQRCQufUIqmBIyQR5VO-rq_cujt5BmRmrnzZi19vvEfKMud2XgLU4XlEFsTAX_ayKJWjPViwje7svJnv1r_uZ2dbyBY8zIxisiG58b8uBQwN84RoZ2HKfZXh3KA-kaPstVX-os-wtV37wFa4hXb5DZd_KQArhLQ9c1S-BDZpVN0ip6EnyXDIeGHZao7-fKeUB-7cjjd-BuK2d1jWqj9JzgqcxZ4TfqHtlNdEZarAXIaXjwZbwwroxm8MDmdYbKsT5djTUOUn1h1j42hGleolsEfFUDnqES9IvAZxSJno0o2pcOf_HqBm9p-wc3UygVJEmhTd65iXEoweW3FlsuCDV6-RyUvxr6qDWH5hqTE3-TljBEZiGWCg6-buRA677FnVmhMiR9mCY1pS4fK8nw_ln3rfpdgm8y-o9Ry3817q8bFvv7-f22TpmXsK_p95uDBoT-FYn5GcVDEiOHRy7Bh_Ay78BPo6n7P9ocQeFkTUpRh1D-vvxvQTU_f26KF3YcPJAxENFGSezOXNr6fQoBDi4K78OTwd9okiNU7bF2O05eN48qQ9fHGL7U8LeaZiVfaJ70Sxr1gf6BAKwStgVwRQ2DOjcs2gekAepFLlWJT92Ja9EbYgV0m3yZRKEGN8ZQKaT59n9C4xVUiViEVfUYomu5U91U67Z4GPutl1px4AhGcz53QalqZR5hYaVC6TqettsnLe0cjM11HlHjPBA2vfj68PaS1DbP4WNmaefwGBS-hXEA2lZcSl9d9pFV-8Qk1JYvX1yeW6FdxR04A1oD8cxyWLIwuSO8Z9LGeaH99V6P1zDue3RJOH_dka32iGs9xVNRdn-4TK0w6cF8ow1LVtVpT1_OuAFTuS2pHh99juxXMz84w5RUngH7AqV6cvqENhyPvpQwCslIsIrE9MsQDN1WTqKY2c2PbZHsTESdclgzL-P88SIZp7ucGr9hyVutRHUob7qaaPx2nxe-MqGwCLPE3_1e0jmVo-hELfGZZwTHh0_34Id6vWusPQNkoIyeSEiECcNwQiFTeYF8pYMPFK6LTFcWsuFJ24zEsA4w5M-FFESXvYejlgns16uoy-LkyS5FkXjZu_2pY7sj3NMfKGHeDUjwRLVPc-KjrzW9NBZLjyh4zukjXLRaHpUgMzM&isca=1"
              },
              "easy": {
                "content": "https://ff4229ab181768b71af2e15b9782d30a0b5f25054afb0d68743852d-apidata.googleusercontent.com/download/storage/v1/b/learn-bucket-2820/o/web_development%2FIntroduction%20to%20Web%20Development%2FModule%201%20-%20HTML%20Fundamentals%2Feasy%2Fcontent.json?jk=AXvcXDs8JWJ7NOxPQQYaRpV3nIM3VqRvtIGIj_OlYhhlZnRlC9NbvhJQXo7HHcuFbTB1jmYJ-8CIHU2INDKJihOJYjf5FF-DioxXet6y7WHhohTE170F_SFmXQ-uv8TvlGbUWTGfp5QoofBVFv92CdZFEEtI1hEvgrVDp12uMf9648SgjunvFoZvWejmou-Iqrrgnav4tyiznCdcQUTjzkVofXzHGiAj6pLdqDiUZt6SZPP7zfz2AEKsDvEUJ5DXPOkuKb5nnAbAuXgioiy1757ZySxglILuzhXid2lD5pIlMtmL_DTdiI0CtsJwkr9H_yOof1dFhNJG451RAKYadU_cgoxVj0Zy693OMtkWksqcxT86ZAUAWJxtSs9aexSkMzQlI5zH5VgbDW1s96W6k78TQIa1MWbzYtKYTB9LdfQ2N_N0TfCLbi3A5AKlN24ctiE1P_2w7eKanTFq8r__NKVYWXUQOvvkXa0Ux-Oe7cT04TkVCBI3ViiUHcI1QsH4fHvC0e88nSRUEkNOMRLiUMjwTmpbOlo1lkiM3RJh8Eq-kt_K5czNFhESJMLzMyv4Z8l9lZ6i7T9c7ROL9ho0Mysb-wAy5E3j0miWcMRzLmzA0QK4-aMvnrlHR3PTU_3caGVVz73PDFm553ItO8aQwoxdnKtI0jXx7a8DnInE1-NVYOw4eObpfENTfP4V9TEMWOM0God-Q9bwCeCG2HrFlU-JAZGS4AMYCgSxS-HX7F3BMeRjrXy8CuzNvjB8lv3Y1kAIP8dl714bKmTe8GvKFNGAwV-CqWwNclA6DceEEzVfl4K8PHFZEVWYykX_34x5o8TH9ktQNOi2VIx_b4ZR2ZWG0X5whYY6AgqfNSJsMIHLBfzskkwuuJqWtpmP09rJByBSgub_lFH4XYrWrk-731JMTHLYTkmUCObPNjp-cloUijqPFtGWzzKYmP1A-76w6Yjfp_8fHt1PZJCPnalKBp21NP2eedQn-EFVq4vzS0e4q7E58ufMYKdbEcK61laDoTZJac0fL-AlZFmQ8A1J-VtokDDRA4efemqmeOCafWQ7-mHNUbLkJ9alcACa4nS00hIjLJLlCAfXEkQBDCFiESUCl9mlSgi6J9jHtI-5y2fgA7UlSxF6HouK9nDYZ1cJUo1UXBsQnTRMktxOz_uho8DZJNtMjC70YBZdrRhPXd52wEK4azfAZaS0sN7sK5C_fxdeR6CteI67jqZs5C53hjoJ61B8uztzeA4eP49CkHSVWpMpdhwQ8C9QDnzvdZfxl6JqPa73fsLtfF_SS8TG0Ymna_qQVdTmsPcPykwtU4xuJj82KGqlbDaLvoo8KM0pDtWZfQYFZ2DQDFpY0AEHAVrlvEyAWLiuNQGib_lR4qoIqegCRj42mVrhr5Jmm9de2VMPe0QGgU-zqna6aEDsvO7QT8kwzCQggO3qE07fDedqRnYeXWy9WDrA&isca=1"
              },
              "standard": {
                "content": "https://ffc04dbd39b4b846ad1a16a0f5791b561255b47654509bcd8183a56-apidata.googleusercontent.com/download/storage/v1/b/learn-bucket-2820/o/web_development%2FIntroduction%20to%20Web%20Development%2FModule%201%20-%20HTML%20Fundamentals%2Fstandard%2Fcontent.json?jk=AXvcXDtjFsMAVJqLfCSruiwYm3PyfYNpgPlZVdFfSy7Ny88f6_LoWj8iGmzb0ydg5Wox-ZV_VZqz8mKvNb-kkD_htOfrJrIcehhVKCbtDnFmfnb7qPyNXu4MDWhY_1qrO799QzBUXi9FVhmkia22LcaVIje9ePBUXDLy_mP_y3Lg4xjx-ZYu-srIxNmfuykgUsu_wpQkKC-wt1XKxgyUMSSTYs3PD-cflecOvmiJtRcICzbvlpK_3osdTVdLNgXjHvBjsKCh9RtJ4KnMyB0Ec_0qg_ImE1YVipingXbptkLKkZ3hV3mtWHzqrDOnH4l5p1-O8PCgiVUZVyjvmnEoM9AG4GkICo9ufV3g15hLYBuVi8_8Du5kG-B6_gzvWrGPYGCwJpJMNful3C79fBju8rEQTv2_dgAuSfKkx73ppeeBMoaOcZMtLy-CWSf4y43djn-P7z_AZaJ5yZGwErfeClJFCTYC4nbQcJp8LmQwDznqB5XdlOMkt1ibQfEEm2bIG6-We5q8BAzIuavtnzYxirVDj7AqxOHy3N0zlHTZWHnCaJbIk6fINIuWmfuacaGrj2o-vanUAUaitEbZ-6Dh7D18i8KYT12JClX4YNoxOUtpcpxMrzclm9EaUn06MFXfCQ6F9jGUddpR1tOmK-8QpO9Y8vLBOSKr0oUXrCDRcJi_9ud95w6Z3y--btxOuT9KHQNq7osZ8U9drsRp5VLL3tyIYdDd4RKcCSwopVE7T90vCfkiR8cEky8l8wVAM8VEu7ab2I-JzVmkXCnsXGnfXTXc-SJK-SB6E-XnwVhttj3ElUzmE7iAsyCs-MtpPiqQcge-Xk6NJAV6cLao_ZZ2o-dkDDy01L73bxtX_ztLpWyLeRld9-SyjCwjzVJySGKpT7RVmtI0dlXkXKoxIyTLBIyktzgBiwiJcL8mktish1rrwoaai4tXXHlA-IxI-1eDLEOK5DSN87DwAqxxS1JVb4fMH8n9obcm1HSYnqJm_xD6M0pjMRVDhL6Jxbv6jDnU2l_VPr_8l-_EI-M2-g_I7e_TbFyjHsaWJd2uURHQMHHFagV3ch8saU77Xb1MXJlS_pNb_u2_44lzX6SJC6h6VUtCheHm2oLiLaL77lbN-8cU_IaPQNeBuy-uUH_r2apR9Sa1fkKNHhg6A351uRa1XiMTzVtWHwIyuBMPtsQCP33T9ffbwu-RKyoW64BkInap-zawmGVgjbtflc4oZHWzWwwGNsjfVkSg8o1tAb5LgYjJh7MT8a8sXaj0cZicopyUFfkOWMmdE4EVWJt2NUdiLL0LrUnemvsKBZFDsAbsVnp4QAzcZ4U77ugWzDX9Gg90wxoqT3FqHi-s70Syo_BEOEXu69MTWAX1JF8MF2XXTh2ws5dcWAmdx6QLdhiE9IgZgcVLLeqrGB0zVsHyt6lDxCc_wL4cbBx7JeSKF3TXdvMoswgUYBHzc3fhGLEGyw&isca=1"
              }
            },
            "Module 2 - CSS Styling": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            },
            "Module 3 - JavaScript Basics": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            },
            "Module 4 - Responsive Design": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            },
            "Module 5 - Introduction to Web Frameworks": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            },
            "Module 6 - Building a Simple Web Application": {
              "easiest": {
                "content": "content.json"
              },
              "easy": {
                "content": "content.json"
              },
              "standard": {
                "content": "content.json"
              }
            }
          }
        }    
    };
    
    
      
      

      try {
        for (const domain in courses) {
          for (const courseName in courses[domain]) {
            const courseModules = courses[domain][courseName];
      
            for (const moduleName in courseModules) {
              // Remove "easiest", "easy", and "standard"
              const { easiest, easy, standard, ...cleanedModule } = courseModules[moduleName];
    
              const moduleRef = doc(db, `courses/${domain}/course_names/${courseName}/modules/${moduleName}`);
              await setDoc(moduleRef, cleanedModule); // Save only the cleaned data
              console.log(`Module data for ${moduleName} in ${courseName} successfully written without standard, easy, and easiest!`);
            }
          }
        }
      } catch (error) {
        console.error("Error writing document: ", error);
      }
}

export default storeCourseData;
