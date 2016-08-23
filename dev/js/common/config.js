/**
 * Created by AllanXu on 4/7/2016.
 */

define(function () {
    var server_host = 'http://115.239.229.12:8020/';
    return {
        server_host: server_host,
        DICTIONARY:{
            newsType: '9d6eb935bd274e09b9b07c08e1f6e489'
        },
        SERVICE: {
            POLICY: {
                LIST: server_host + 'policy/findPage',
                DETAILS: server_host + 'policy/load',
                STORE: server_host + 'policyCollect/save',
                UNSTORE: server_host + 'policyCollect/delete',
                SHARE: server_host + 'policyShare/save',
                PRAISE: server_host + 'policy/praise',
                // 在线匹配
                MATCHONLINE: server_host + 'policy/matchePolicy'

            },
            EDU: {
                LIST: server_host + 'educationStudy/findPage',
                DETAILS: server_host + 'educationStudy/load',
                STORE: server_host + 'educationStudyCollect/save',
                UNSTORE: server_host + 'educationStudyCollect/delete',
                SHARE: server_host + 'educationStudyShare/save',
                PRAISE: server_host + 'educationStudy/praise'
            },
            NEWS: {
                LIST: server_host + 'news/findPage',
                DETAILS: server_host + 'news/load',
                STORE: server_host + 'newsCollect/save',
                UNSTORE: server_host + 'newsCollect/delete',
                SHARE: server_host + 'newsShare/save',
                PRAISE: server_host + 'news/praise',

                //NEWSTYPE: server_host + 'news/getNewsType'
                // NEWSTYPE: server_host + 'dic/getNewsType',
                NEWSTYPE: server_host + 'dic/getDictionary',
            },
            LABOUR: {
                // 就业指导
                LIST: server_host + 'labourEmploy/findPage',
                DETAILS: server_host + 'labourEmploy/load',
                STORE: server_host + 'labourEmployCollect/save',
                UNSTORE: server_host + 'labourEmployCollect/delete',
                SHARE: server_host + 'labourEmployShare/save',
                PRAISE: server_host + 'labourEmploy/praise',
                // 岗位匹配列表 & 岗位匹配详情页
                MATCHLIST: server_host + 'recruit/postMatch',
                MATCHDETAILS: server_host + 'recruit/findPage',

                //TOAPPLY: server_host + 'recruitEnroll/save',
                //RECRUISTORE: server_host + 'labourEmployCollect/save',
                //RECRUIUNSTORE: server_host + 'labourEmployCollect/delete',

                // 招聘会列表 & 招聘会详情页
                RECRUITLIST:server_host + 'recruitAssociation/findPage',
                RECRUITDETAILS:server_host + 'recruitAssociation/load',
                // 求职意向
                JOBAPPLY: server_host + 'employApply/save',

            },

            RECOVERY: {
                LIST: server_host + 'recovery/findPage',
                DETAILS: server_host + 'recovery/load',
                STORE: server_host + 'recoveryCollect/save',
                UNSTORE: server_host + 'recoveryCollect/delete',
                SHARE: server_host + 'recoveryShare/save',
                PRAISE: server_host + 'recovery/praise'
            },
            SAFEGUARD: {
                LIST: server_host + 'socialSecurity/findPage',
                DETAILS: server_host + 'socialSecurity/load',
                STORE: server_host + 'socialSecurityCollect/save',
                UNSTORE: server_host + 'socialSecurityCollect/delete',
                SHARE: server_host + 'socialSecurityShare/save',
                PRAISE: server_host + 'socialSecurity/praise'
            },
            // 办证指南 "guideType":"5","areaCode":"33"
            CARDGUIDE: {
                LIST: server_host + 'cardGuide/load',
            },
            SUGGESTION: {
                POST: server_host + 'proposal/save'
            }



        }
    }
});
