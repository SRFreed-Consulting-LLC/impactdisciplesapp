import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormioForm } from '@formio/angular';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  form: FormioForm = {
    "display": "form",
    "components": [
        {
            "html": "<p style=\"text-align:center;\"><span class=\"text-big\">IMPACT 1</span></p>",
            "label": "Content",
            "refreshOnChange": false,
            "key": "content",
            "type": "content",
            "input": false,
            "tableView": false
        },
        {
            "html": "<p style=\"text-align:center;\"><strong>Lesson 1</strong></p><p style=\"text-align:center;\"><strong>Salvation and Assurance</strong></p>",
            "label": "Content",
            "refreshOnChange": false,
            "key": "content1",
            "type": "content",
            "input": false,
            "tableView": false
        },
        {
            "label": "Tabs",
            "components": [
                {
                    "label": "Lesson 1",
                    "key": "lesson",
                    "components": [
                        {
                            "html": "<p><strong>Memory Verse: </strong>John 1:12</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content6",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p><strong>Goal:</strong> To know that you are saved and have assurance of your salvation.</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content4",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "label": "Here is the single most important question in life: do you know for certain that you have been saved and will spend the rest of eternity in Heaven when you die?",
                            "optionsLabelPosition": "right",
                            "inline": false,
                            "tableView": false,
                            "values": [
                                {
                                    "label": "Yes, I know for certain",
                                    "value": "yesIKnowForCertain",
                                    "shortcut": ""
                                },
                                {
                                    "label": "I am not sure",
                                    "value": "iAmNotSure",
                                    "shortcut": ""
                                },
                                {
                                    "label": "I know I am not saved",
                                    "value": "iKnowIAmNotSaved",
                                    "shortcut": ""
                                }
                            ],
                            "validateWhenHidden": false,
                            "key": "radio",
                            "type": "radio",
                            "input": true
                        },
                        {
                            "html": "<p>The truth is, everyone will die. It is also sobering to know that you will exist outside of this earth much longer than you will exist on it. Knowing your answers to the questions listed above is essential in light of those two truths.</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content2",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p><span class=\"text-big\"><strong>WHAT DOES THE BIBLE SAY?</strong></span></p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content3",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p>The Bible has a lot to say about the subject of salvation and the assurance of salvation. Here are a few highlights.</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content5",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p><strong>Everyone needs salvation</strong>: The Bible clearly states that everyone is born in need of a savior. We come into this world separated from God and live in a broken relationship with Him.</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content7",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "label": "How does Romans 3:23 describe this condition?",
                            "applyMaskOn": "change",
                            "autoExpand": false,
                            "tableView": true,
                            "validateWhenHidden": false,
                            "key": "howDoesRomans323DescribeThisCondition",
                            "type": "textarea",
                            "input": true
                        },
                        {
                            "html": "<p>Not only are all people born into a broken relationship with God, but we will also experience death unless our sin condition is changed.</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content8",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "label": "What does Romans 6:23 say about the “wages of sin”?",
                            "applyMaskOn": "change",
                            "autoExpand": false,
                            "tableView": true,
                            "validateWhenHidden": false,
                            "key": "whatDoesRomans623SayAboutTheWagesOfSin",
                            "type": "textarea",
                            "input": true
                        },
                        {
                            "html": "<p>Being sinners means that we will all spend eternity separated from God unless our spiritual condition changes.</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content9",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p><strong>Jesus Christ came to save you from your sins</strong>: The Bible is clear that everyone has a need for salvation, and it is also clear that Jesus is the Savior we need. Romans 6:23 says, “The wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord.” By placing your faith in Jesus, you can be saved and spend eternity with Him in Heaven. Without placing your faith in Jesus, there is no promise of salvation or an eternal home in Heaven with Him.</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content10",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p><strong>Salvation is an individual decision to receive Christ as Savior and Lord:</strong> Becoming a Christian is a decision everyone must make individually. Being born in a Christian home will not make you a Christian. Being a member of a local church or being baptized will not give you salvation from your sins. You can be saved only if you personally admit that you’re a sinner, confess your sins, surrender your life to Christ and receive His Spirit in your heart.</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content11",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "label": "What does John 1:12 promise you?",
                            "applyMaskOn": "change",
                            "autoExpand": false,
                            "tableView": true,
                            "validateWhenHidden": false,
                            "key": "whatDoesJohn112PromiseYou",
                            "type": "textarea",
                            "input": true
                        },
                        {
                            "html": "<p><span class=\"text-big\"><strong>WHAT SHOULD YOU DO?</strong></span></p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content12",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p>If you believe what the Bible says about salvation, you will want to take that step of faith in your life as soon as possible. Taking this step is as simple as “A,B,C.”</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content13",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p><strong>A</strong>dmit your need for Jesus as your Savior</p><p><strong>B</strong>elieve that Jesus is the Son of God and that He can restore your relationship with God</p><p><strong>C</strong>hoose to invite Jesus into your heart and surrender your life to Him</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content14",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p>Now, I encourage you to say this simple prayer of faith to God.&nbsp;</p><p>“Lord Jesus, please come into my life and be my Savior and Lord. Please forgive me for my sin and take control of my life. I believe that you are the Son of God and died on the cross and rose from the dead, and I place my faith in you. Please make me the person you created me to be. Thank you for saving me.”</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content15",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p><span class=\"text-big\"><strong>YOU CAN HAVE ASSURANCE OF YOUR SALVATION</strong></span></p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content16",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p>Satan will do his best to make you doubt your salvation. He will work overtime to cause you to question whether or not you have truly been saved. You can have assurance of your salvation by remembering that your salvation is a fact based on God’s Word, not on a feeling that you have. Emotions will come and go, but the promises of God’s Word will remain true regardless of your circumstances.</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content17",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p>Three things in God’s Word can help you have the assurance of your salvation.</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content18",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p><strong>You can know you are saved by the power of God.</strong></p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content19",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "label": "What does John 10:27-28 promise you?",
                            "applyMaskOn": "change",
                            "autoExpand": false,
                            "tableView": true,
                            "validateWhenHidden": false,
                            "key": "whatDoesJohn102728PromiseYou",
                            "type": "textarea",
                            "input": true
                        },
                        {
                            "html": "<p><span class=\"text-small\"><strong>No one can snatch you out of God’s hand.</strong></span></p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content22",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p><strong>You can know you are saved by the person Jesus Christ.</strong></p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content20",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "label": "What does Jude 1:24-25 say concerning Jesus?",
                            "applyMaskOn": "change",
                            "autoExpand": false,
                            "tableView": true,
                            "validateWhenHidden": false,
                            "key": "whatDoesJude12425SayConcerningJesus",
                            "type": "textarea",
                            "input": true
                        },
                        {
                            "html": "<p><strong>You can know you are saved by the presence of the Holy Spirit.</strong></p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content21",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "label": "What are you sealed with according to Ephesians 1:13-14?",
                            "applyMaskOn": "change",
                            "autoExpand": false,
                            "tableView": true,
                            "validateWhenHidden": false,
                            "key": "whatAreYouSealedWithAccordingToEphesians11314",
                            "type": "textarea",
                            "input": true
                        },
                        {
                            "html": "<p><span class=\"text-big\"><strong>SAVED AND CONFIDENT</strong></span></p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content23",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p>Nothing will bring you more peace than being saved and confident of your salvation. If you have asked Christ to come into your life, He will. You can be certain that He is living in your heart because His Word says so.</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content24",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "label": "If you have placed your faith in Jesus, describe that experience and what it was like for you.",
                            "applyMaskOn": "change",
                            "autoExpand": false,
                            "tableView": true,
                            "validateWhenHidden": false,
                            "key": "ifYouHavePlacedYourFaithInJesusDescribeThatExperienceAndWhatItWasLikeForYou",
                            "type": "textarea",
                            "input": true
                        }
                    ]
                },
                {
                    "label": "Discussion",
                    "key": "discussion",
                    "components": [
                        {
                            "html": "<p><span class=\"text-big\"><strong>Questions for Group Discussion and/or Personal Reflection</strong></span></p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content25",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p>Open your group time with prayer and a time of sharing a highlight from your week.</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content26",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "html": "<p>Recite this week’s memory verse and share insights from your daily Scripture reading.</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content27",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        },
                        {
                            "label": "How did you answer the question at the very beginning of this lesson regarding salvation?",
                            "applyMaskOn": "change",
                            "autoExpand": false,
                            "tableView": true,
                            "validateWhenHidden": false,
                            "key": "howDidYouAnswerTheQuestionAtTheVeryBeginningOfThisLessonRegardingSalvation",
                            "type": "textarea",
                            "input": true
                        },
                        {
                            "label": "Read Romans 3:23. What does this verse tell us about our spiritual condition without Christ?",
                            "applyMaskOn": "change",
                            "autoExpand": false,
                            "tableView": true,
                            "validateWhenHidden": false,
                            "key": "readRomans323WhatDoesThisVerseTellUsAboutOurSpiritualConditionWithoutChrist",
                            "type": "textarea",
                            "input": true
                        },
                        {
                            "label": "Have you realized your need for a savior? If so, what brought about that realization?",
                            "applyMaskOn": "change",
                            "autoExpand": false,
                            "tableView": true,
                            "validateWhenHidden": false,
                            "key": "haveYouRealizedYourNeedForASaviorIfSoWhatBroughtAboutThatRealization",
                            "type": "textarea",
                            "input": true
                        },
                        {
                            "label": "If you answered “yes” above, describe how you came to faith in Jesus Christ.",
                            "applyMaskOn": "change",
                            "autoExpand": false,
                            "tableView": true,
                            "validateWhenHidden": false,
                            "key": "ifYouAnsweredYesAboveDescribeHowYouCameToFaithInJesusChrist",
                            "type": "textarea",
                            "input": true
                        },
                        {
                            "label": "How has your life changed since coming to faith in Jesus Christ?",
                            "applyMaskOn": "change",
                            "autoExpand": false,
                            "tableView": true,
                            "validateWhenHidden": false,
                            "key": "howHasYourLifeChangedSinceComingToFaithInJesusChrist",
                            "type": "textarea",
                            "input": true
                        },
                        {
                            "label": "Read John 10:28. Have you ever doubted your salvation? Describe why you think you struggled with it if you have. How can you find assurance of your salvation?",
                            "applyMaskOn": "change",
                            "autoExpand": false,
                            "tableView": true,
                            "validateWhenHidden": false,
                            "key": "readJohn1028HaveYouEverDoubtedYourSalvationDescribeWhyYouThinkYouStruggledWithItIfYouHaveHowCanYouFindAssuranceOfYourSalvation",
                            "type": "textarea",
                            "input": true
                        },
                        {
                            "html": "<p>Take some time to share prayer requests and pray for each other.</p>",
                            "label": "Content",
                            "refreshOnChange": false,
                            "key": "content28",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        }
                    ]
                },
                {
                    "label": "Daily Readings",
                    "key": "prayerRequests",
                    "components": [
                        {
                            "label": "Columns",
                            "columns": [
                                {
                                    "components": [
                                        {
                                            "html": "<p><strong>Weekly Bible Reading</strong></p><p>Read the passage and write an insight on at least one of the following:</p><p><strong>A</strong>: Attitude to Change</p><p><strong>C</strong>: Command to Obey</p><p><strong>T</strong>: Truth to Believe</p><p><strong>S</strong>: Sin to Confess</p>",
                                            "label": "Content",
                                            "refreshOnChange": false,
                                            "key": "content30",
                                            "type": "content",
                                            "input": false,
                                            "tableView": false
                                        }
                                    ],
                                    "width": 6,
                                    "offset": 0,
                                    "push": 0,
                                    "pull": 0,
                                    "size": "md",
                                    "currentWidth": 6
                                },
                                {
                                    "components": [
                                        {
                                            "html": "<p><strong>Monday</strong>: Isaiah 59:1-13</p><p><strong>Tuesday</strong>: Matthew 19:16-30</p><p><strong>Wednesday</strong>: John 3:1-20</p><p><strong>Thursday</strong>: John 9:24-41</p><p><strong>Friday</strong>: Romans 6:1-23</p>",
                                            "label": "Content",
                                            "refreshOnChange": false,
                                            "key": "content29",
                                            "type": "content",
                                            "input": false,
                                            "tableView": false
                                        }
                                    ],
                                    "width": 6,
                                    "offset": 0,
                                    "push": 0,
                                    "pull": 0,
                                    "size": "md",
                                    "currentWidth": 6
                                }
                            ],
                            "key": "columns",
                            "type": "columns",
                            "input": false,
                            "tableView": false
                        }
                    ]
                }
            ],
            "key": "tabs",
            "type": "tabs",
            "input": false,
            "tableView": false
        }
    ]
}



  public isVisible$ = new BehaviorSubject<boolean>(false);

  private ngUnsubscribe = new Subject<void>();

  constructor(){}

  async ngOnInit(){}


  onCancel(){
    this.isVisible$.next(false);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
