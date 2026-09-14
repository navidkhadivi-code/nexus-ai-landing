import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TERMINAL = 'https://ai.ipeset.com';
type L = 'en' | 'fa';

const T: Record<string, { en: string; fa: string }> = {
  navHome: { en: 'Home', fa: 'خانه' },
  navHow: { en: 'How It Works', fa: 'چطور کار میکند' },
  navAI: { en: 'AI Intelligence', fa: 'هوش مصنوعی' },
  navFeatures: { en: 'Features', fa: 'امکانات' },
  navRisk: { en: 'Risk Management', fa: 'مدیریت ریسک' },
  navTech: { en: 'Technology', fa: 'تکنولوژی' },
  navFaq: { en: 'FAQ', fa: 'سوالات' },
  enterPanel: { en: 'ENTER USER PANEL', fa: 'ورود به پنل کاربری' },
  tagline: { en: 'AI-POWERED TRADING INTELLIGENCE', fa: 'هوش معاملاتی ارز دیجیتال با AI' },

  heroK: { en: 'AI-POWERED CRYPTO TRADING INTELLIGENCE', fa: 'پلتفرم هوش مصنوعی معاملاتی' },
  h1a: { en: 'TRADE WITH', fa: 'با هوش معامله کن،' },
  h1b: { en: 'INTELLIGENCE.', fa: 'نه با احساس.' },
  h1c: { en: 'NOT EMOTION.', fa: '' },
  heroLead: { en: 'PersianTrade combines real-time market data, quantitative analysis and specialized AI agents to help traders understand market conditions, identify high-quality opportunities and manage risk with greater structure.', fa: 'پرشین‌ترید داده لحظه‌ای بازار، تحلیل کمّی و ایجنت‌های تخصصی هوش مصنوعی را ترکیب میکند تا تریدرها شرایط بازار را بهتر بفهمند، فرصت‌های باکیفیت را شناسایی کنند و ریسک را با ساختاری دقیق مدیریت کنند.' },
  btnExplore: { en: 'EXPLORE PERSIANTRADE', fa: 'آشنایی با پرشین‌ترید' },
  btnHow: { en: 'HOW IT WORKS', fa: 'چطور کار میکند' },
  f1: { en: 'REAL-TIME MARKET DATA', fa: 'داده لحظه‌ای بازار' },
  f1s: { en: 'live feeds · validated · timestamped', fa: 'فید زنده · اعتبارسنجی · زمان‌دار' },
  f2: { en: 'AI INTELLIGENCE', fa: 'هوش مصنوعی' },
  f2s: { en: '8 specialized agents · consensus', fa: '۸ ایجنت تخصصی · اجماع' },
  f3: { en: 'RISK ENGINE', fa: 'موتور ریسک' },
  f3s: { en: 'ARES · position · exposure · veto', fa: 'آرس · حجم · قرارگیری · وتو' },
  f4: { en: 'CLEARER DECISION', fa: 'تصمیم شفاف‌تر' },
  f4s: { en: 'LONG · SHORT · or NO TRADE', fa: 'LONG · SHORT یا بدون معامله' },
  strip: { en: 'REAL MARKET DATA · MULTI-AGENT AI · QUANTITATIVE ANALYSIS · LIQUIDITY · ORDER FLOW · MULTI-TIMEFRAME · RISK MANAGEMENT · PAPER TRADING', fa: 'داده واقعی بازار · ایجنت‌های چندگانه · تحلیل کمّی · نقدینگی · جریان سفارش · چندتایم‌فریم · مدیریت ریسک · معامله کاغذی' },

  whatK: { en: 'WHAT IS PERSIANTRADE?', fa: 'پرشین‌ترید چیست؟' },
  whatH: { en: 'ONE INTELLIGENCE LAYER FOR THE ENTIRE MARKET.', fa: 'یک لایه هوشمند برای کل بازار.' },
  whatLead: { en: 'Crypto markets generate massive amounts of information. Price, volume, liquidity, order flow, funding, open interest and market structure can all change rapidly. PersianTrade brings these layers into one intelligent workspace.', fa: 'بازار کریپتو حجم عظیمی اطلاعات تولید میکند: قیمت، حجم، نقدیگی، جریان سفارش، فاندینگ، open interest و ساختار بازار — همه با سرعت تغییر میکنند. پرشین‌ترید این لایه‌ها را در یک فضای کاری هوشمند یکپارچه میکند.' },
  wc1t: { en: 'REAL-TIME DATA', fa: 'داده لحظه‌ای' },
  wc1d: { en: 'Live market information, price movements, volume and market activity.', fa: 'اطلاعات زنده بازار، حرکات قیمت، حجم و فعالیت بازار.' },
  wc2t: { en: 'AI INTELLIGENCE', fa: 'هوش مصنوعی' },
  wc2d: { en: 'Multiple specialized AI agents analyze different aspects of the market.', fa: 'چند ایجنت تخصصی، جنبه‌های مختلف بازار را تحلیل میکنند.' },
  wc3t: { en: 'RISK CONTROL', fa: 'کنترل ریسک' },
  wc3d: { en: 'Every potential setup is evaluated through a dedicated risk layer.', fa: 'هر ستاپ بالقوه از لایه اختصاصی ریسک عبور میکند.' },

  probK: { en: 'THE PROBLEM', fa: 'مشکل' },
  probH: { en: 'THE MARKET IS FULL OF INFORMATION. THE REAL PROBLEM IS KNOWING WHAT MATTERS.', fa: 'بازار پر از اطلاعات است. مشکل واقعی، فهمیدن این است که کدام اطلاعات اهمیت دارد.' },
  tooMuch: { en: 'TOO MUCH INFORMATION.', fa: 'حجم اطلاعات بیش از حد.' },
  oneView: { en: 'ONE STRUCTURED VIEW.', fa: 'یک نمای ساختارمند.' },
  probLead: { en: 'Instead of switching between multiple tools, PersianTrade organizes important market information into one structured decision-making process.', fa: 'به‌جای جابه‌جایی بین ده‌ها ابزار، پرشین‌ترید اطلاعات مهم بازار را در یک فرآیند تصمیم‌گیری ساختارمند سازماندهی میکند.' },
  pChips: { en: 'Charts|News|Order Book|Funding|Open Interest|Liquidations|Indicators|Volume|Market Data', fa: 'چارت|اخبار|دفتر سفارش|فاندینگ|Open Interest|لیکوئیدیشن|اندیکاتورها|حجم|داده بازار' },

  howK: { en: 'HOW IT WORKS', fa: 'چطور کار میکند' },
  howH: { en: 'FROM RAW DATA TO A CLEARER DECISION.', fa: 'از داده خام تا تصمیم شفاف‌تر.' },
  s1t: { en: 'COLLECT', fa: 'گردآوری' },
  s1d: { en: 'Real-time market information is collected from connected exchanges and data sources.', fa: 'اطلاعات لحظه‌ای از صرافی‌ها و منابع متصل جمع‌آوری میشود.' },
  s2t: { en: 'ANALYZE', fa: 'تحلیل' },
  s2d: { en: 'Technical analysis, liquidity, order flow, quantitative models and market context are processed.', fa: 'تکنیکال، نقدینگی، جریان سفارش، مدل‌های کمّی و کانتکست بازار پردازش میشود.' },
  s3t: { en: 'CONSENSUS', fa: 'اجماع' },
  s3d: { en: 'Specialized AI agents independently analyze different aspects of the market.', fa: 'ایجنت‌های تخصصی مستقل، جنبه‌های مختلف را بررسی میکنند.' },
  s4t: { en: 'CONTROL', fa: 'کنترل' },
  s4d: { en: 'The risk engine evaluates the setup before it can move forward.', fa: 'موتور ریسک ستاپ را قبل از هر اقدامی ارزیابی میکند.' },
  flowWords: { en: 'DATA|INTELLIGENCE|CONSENSUS|RISK|DECISION', fa: 'داده|هوش|اجماع|ریسک|تصمیم' },

  aiK: { en: 'AI AGENTS', fa: 'ایجنت‌های هوش مصنوعی' },
  aiH: { en: 'NOT ONE AI. A TEAM OF SPECIALISTS.', fa: 'یک هوش مصنوعی نه. تیمی از متخصص‌ها.' },
  aiLead: { en: 'Different market questions require different types of intelligence.', fa: 'هر سوال بازاری، نوعی هوش متفاوت می‌خواهد.' },
  aresNote: { en: 'ARES can reject a trade even if other agents agree.', fa: 'آرس حتی اگر بقیه ایجنت‌ها هم‌نظر باشند، حق رد معامله دارد.' },
  agentsData: {
    en: 'NOVA|Market Structure|Trend,Support,Resistance,BOS,CHOCH;ORION|Price Action|Momentum,Breakouts,Rejections,Retests;LUMA|Order Flow|Buyers,Sellers,Volume Pressure,Activity;ATLAS|Liquidity|Zones,Stop Clusters,Sweeps,Order Blocks;GANN|Time & Price|Price Cycles,Time Cycles,Gann Levels,Symmetry;MACRO|Market Context|Conditions,Macro Factors,Sentiment;QUANT|Quantitative|Volatility,Momentum,Probability,History;ARES|Risk Management|Position Size,Stop Distance,Leverage,Exposure',
    fa: 'NOVA|ساختار بازار|روند،حمایت،مقاومت،BOS،CHOCH;ORION|پرایس اکشن|مومنتوم،بریک‌اوت،ریجکشن،ری‌تست;LUMA|جریان سفارش|خریداران،فروشندگان،فشار حجم،فعالیت;ATLAS|نقدینگی|زون‌ها،کلاستر استاپ،اسوئیپ،اوردر‌بلاک;GANN|زمان و قیمت|چرخه قیمت،چرخه زمان،سطوح گن،تقارن;MACRO|کانتکست بازار|شرایط،عوامل ماکرو،احساسات;QUANT|تحلیل کمّی|نوسان،مومنتوم،احتمال،تاریخچه;ARES|مدیریت ریسک|حجم،فاصله استاپ،اهرم،قرارگیری',
  },

  perspK: { en: 'MULTIPLE PERSPECTIVES', fa: 'دیدگاه‌های چندگانه' },
  perspH: { en: 'ONE MARKET. MULTIPLE PERSPECTIVES.', fa: 'یک بازار. چندین زاویه دید.' },
  consensus: { en: 'PERSIANTRADE CONSENSUS', fa: 'اجماع پرشین‌ترید' },
  noTrade: { en: 'NO TRADE', fa: 'بدون معامله' },

  ntK: { en: 'DISCIPLINE', fa: 'انضباط' },
  ntH: { en: 'SOMETIMES THE BEST DECISION IS NO TRADE.', fa: 'گاهی بهترین تصمیم، معامله نکردن است.' },
  ntLead: { en: 'PersianTrade is not designed to create a signal every minute. If market conditions are unclear, risk is too high, agents strongly disagree, or the setup does not meet the required conditions, the system simply says: NO TRADE.', fa: 'پرشین‌ترید برای سیگنال‌دادن هر دقیقه طراحی نشده. اگر شرایط مبهم باشد، ریسک بالا باشد، ایجنت‌ها اختلاف نظر داشته باشند یا ستاپ حداقل‌ها را نداشته باشد، سیستم می‌گوید: بدون معامله.' },
  yesItems: { en: 'HIGH CONFIDENCE|GOOD RISK / REWARD|MULTIPLE CONFIRMATIONS', fa: 'اطمینان بالا|ریسک به ریوارد خوب|تأییدیه‌های چندگانه' },
  noItems: { en: 'UNCLEAR MARKET|HIGH RISK|WEAK CONFIRMATION', fa: 'بازار مبهم|ریسک بالا|تأییدیه ضعیف' },
  tradeSetup: { en: 'TRADE SETUP', fa: 'ستاپ معاملاتی' },

  riskK: { en: 'RISK MANAGEMENT', fa: 'مدیریت ریسک' },
  riskH: { en: 'INTELLIGENCE IS NOT ENOUGH. RISK COMES FIRST.', fa: 'هوش کافی نیست. اولویت با ریسک است.' },
  riskLead: { en: 'A market signal is not automatically a trade. Every potential setup passes through the ARES Risk Engine.', fa: 'سیگنال بازار به‌خودی‌خود معامله نیست. هر ستاپ از موتور ریسک ARES عبور میکند.' },
  rfSignal: { en: 'AI SIGNAL', fa: 'سیگنال هوش مصنوعی' },
  rfAres: { en: 'ARES RISK ENGINE', fa: 'موتور ریسک آرس' },
  rfOk: { en: 'APPROVED', fa: 'تأیید' },
  rfBad: { en: 'REJECTED', fa: 'رد (وتو)' },
  riskItems: { en: 'Position Size|Stop Loss|Risk Per Trade|Risk / Reward|Leverage|Portfolio Exposure|Drawdown', fa: 'حجم پوزیشن|حد ضرر|ریسک هر معامله|ریسک/ریوارد|اهرم|قرارگیری پرتفوی|دراودان' },
  vetoBanner: { en: 'THE RISK ENGINE HAS VETO POWER.', fa: 'موتور ریسک حق وتو دارد.' },

  dataK: { en: 'DATA', fa: 'داده' },
  dataH: { en: 'BUILT AROUND REAL MARKET DATA.', fa: 'ساخته‌شده حول داده واقعی بازار.' },
  dataCards: { en: 'LIVE PRICE|ORDER BOOK|TRADES|VOLUME|OPEN INTEREST|FUNDING|LIQUIDATIONS|MARKET STRUCTURE', fa: 'قیمت زنده|دفتر سفارش|معاملات|حجم|OPEN INTEREST|فاندینگ|لیکوئیدیشن|ساختار بازار' },
  dataStrip: { en: 'LIVE DATA|SOURCE VERIFIED|TIMESTAMPED', fa: 'داده زنده|منبع راستی‌آزمایی‌شده|زمان‌دار' },
  dataLead: { en: 'PersianTrade works with live market infrastructure instead of static screenshots or manually entered prices.', fa: 'پرشین‌ترید با زیرساخت زنده بازار کار میکند، نه اسکرین‌شات ثابت یا قیمت دستی.' },

  beyondK: { en: 'DEPTH', fa: 'عمق' },
  beyondH: { en: 'PRICE IS ONLY ONE PART OF THE MARKET.', fa: 'قیمت فقط یک بخش بازار است.' },
  beyondRows: { en: 'Liquidity Zones|Order Flow|Volume|Open Interest|Funding|Liquidations|Market Structure', fa: 'زون‌های نقدینگی|جریان سفارش|حجم|Open Interest|فاندینگ|لیکوئیدیشن|ساختار بازار' },
  previewTag: { en: 'PREVIEW — SIMPLIFIED ILLUSTRATION', fa: 'پیش‌نمایش — نما ساده‌سازی‌شده' },
  beyondLead: { en: 'PersianTrade combines different market dimensions to show what is happening behind price movement.', fa: 'پرشین‌ترید ابعاد مختلف بازار را کنار هم می‌گذارد تا ببینی پشت حرکت قیمت چه خبر است.' },

  mtfK: { en: 'MULTI-TIMEFRAME', fa: 'چندتایم‌فریم' },
  mtfH: { en: 'SEE THE MARKET FROM MORE THAN ONE ANGLE.', fa: 'بازار را از بیش از یک زاویه ببین.' },
  tfHead: { en: 'TIMEFRAME|MARKET VIEW', fa: 'تایم‌فریم|نمای بازار' },
  bullish: { en: 'BULLISH', fa: 'صعودی' },
  neutral: { en: 'NEUTRAL', fa: 'خنثی' },
  tfCons: { en: 'MULTI-TIMEFRAME CONSENSUS', fa: 'اجماع چندتایم‌فریم' },
  mtfLead: { en: 'PersianTrade compares timeframes to identify alignment, conflicts and broader context.', fa: 'پرشین‌ترید تایم‌فریم‌ها را مقایسه میکند تا هم‌راستایی، تضادها و کانتکست کلی مشخص شود.' },

  paperK: { en: 'PAPER TRADING', fa: 'معامله کاغذی' },
  paperH: { en: 'TEST BEFORE YOU RISK CAPITAL.', fa: 'قبل از ریسک سرمایه، تست کن.' },
  peq: { en: 'REAL MARKET DATA|PAPER ACCOUNT|RISK-FREE PRACTICE', fa: 'داده واقعی بازار|حساب آزمایشی|تمرین بدون ریسک' },
  paperLead: { en: 'Explore strategies and trading ideas using market-based simulations before connecting a live account.', fa: 'قبل از اتصال حساب واقعی، ایده‌ها و استراتژی‌ها را با شبیه‌سازی مبتنی بر بازار واقعی کاوش کن.' },
  paperItems: { en: 'Test Entries|Test Stop Loss|Test Take Profit|Test Position Sizing|Test Risk Management', fa: 'تست ورود|تست حد ضرر|تست حد سود|تست حجم|تست مدیریت ریسک' },

  btK: { en: 'BACKTESTING', fa: 'بک‌تست' },
  btH: { en: 'TURN IDEAS INTO DATA.', fa: 'ایده‌ها را به داده تبدیل کن.' },
  btLead: { en: 'Test strategies against historical market conditions and evaluate performance through measurable metrics.', fa: 'استراتژی را روی شرایط تاریخی بازار بسنج و با متریک‌های قابل‌اندازه‌گیری ارزیابی کن.' },
  btMetrics: { en: 'WIN RATE|PROFIT FACTOR|MAX DRAWDOWN|EXPECTANCY|SHARPE RATIO|NUMBER OF TRADES', fa: 'وین‌ریت|ضریب سود|بیشترین افت|امید ریاضی|شارپ|تعداد معامله' },
  exampleTag: { en: 'EXAMPLE ANALYTICS — placeholder metrics only. PersianTrade never displays fabricated results.', fa: 'نمونه متریک — فقط جای‌نمایش. پرشین‌ترید هرگز نتیجه ساختگی نمایش نمی‌دهد.' },

  liveK: { en: 'LIVE TRADING — OPTIONAL', fa: 'معامله واقعی — اختیاری' },
  liveH: { en: 'FROM ANALYSIS TO EXECUTION. WHEN YOU ARE READY.', fa: 'از تحلیل تا اجرا. وقتی آماده‌ای.' },
  liveLead: { en: 'Start with analysis, paper trading and strategy testing. Live exchange connectivity is optional and only activated when the user explicitly chooses.', fa: 'با تحلیل، معامله کاغذی و تست استراتژی شروع کن. اتصال به صرافی اختیاری است و فقط با انتخاب صریح کاربر فعال میشود.' },
  liveFlow: { en: 'ANALYSIS|CONSENSUS|RISK VALIDATION|EXECUTION ENGINE|EXCHANGE', fa: 'تحلیل|اجماع|اعتبارسنجی ریسک|موتور اجرا|صرافی' },
  liveOptional: { en: 'LIVE TRADING IS OPTIONAL.', fa: 'معامله واقعی اختیاری است.' },

  secK: { en: 'SECURITY', fa: 'امنیت' },
  secH: { en: 'BUILT WITH CONTROL IN MIND.', fa: 'ساخته‌شده با ذهنیت کنترل.' },
  secCards: { en: 'Encrypted Credentials|API secrets never stored or sent in plain text.;Two-Factor Authentication|Extra verification for sensitive actions.;Role-Based Access|Granular permissions per user role.;Audit Logs|Important actions are recorded and traceable.;Risk Limits|Hard caps on exposure, leverage and daily loss.;Emergency Kill Switch|Stop new trades and flatten positions instantly.', fa: 'رمزنگاری اعتبارنامه‌ها|کلیدهای API هیچ‌وقت متن ساده ذخیره یا ارسال نمیشوند.;احراز هویت دومرحله‌ای|لایه إضافی برای اقدامات حساس.;دسترسی نقش‌محور|سطوح دسترسی دقیق برای هر نقش.;لاگ ممیزی|اقدامات مهم ثبت و قابل‌ردیابی هستند.;سقف‌های ریسک|محدودیت سخت روی قرارگیری، اهرم و ضرر روزانه.;کلید اضطراری|توقف فوری معاملات جدید و بستن پوزیشن‌ها.' },
  wdNote: { en: 'Withdrawal permissions are never required.', fa: 'مجوز برداشت هرگز درخواست نمیشود.' },
  secLead: { en: 'Trading infrastructure requires more than intelligent analysis. PersianTrade is designed around control, validation and transparency.', fa: 'زیرساخت معاملاتی فراتر از تحلیل هوشمند نیاز به کنترل، اعتبارسنجی و شفافیت دارد.' },

  whoK: { en: 'AUDIENCE', fa: 'مخاطبان' },
  whoH: { en: 'BUILT FOR TRADERS WHO WANT MORE STRUCTURE.', fa: 'برای تریدرهایی که ساختار بیشتری می‌خواهند.' },
  whoCards: { en: 'Active Traders|For a structured view of fast-moving markets.;Quant Traders|Data-driven analysis, backtesting and systematic research.;Professional Teams|Centralized market intelligence and risk control.;Developing Traders|Build a more structured decision process.', fa: 'تریدرهای فعال|نمای ساختارمند از بازارهای پرسرعت.;تریدرهای کمّی|تحلیل داده‌محور، بک‌تست و پژوهش سیستماتیک.;تیم‌های حرفه‌ای|هوش بازار متمرکز و کنترل ریسک.;تریدرهای در حال رشد|ساخت فرآیند تصمیم‌گیری منظم‌تر.' },

  advK: { en: 'THE ADVANTAGE', fa: 'مزیت' },
  advH: { en: 'ONE WORKSPACE. MULTIPLE INTELLIGENCE LAYERS.', fa: 'یک فضای کاری. چند لایه هوش.' },
  tradTitle: { en: 'TRADITIONAL WORKFLOW', fa: 'روال سنتی' },
  tradRows: { en: 'Chart|Indicators|News|Order Book|Risk Calculator|Exchange', fa: 'چارت|اندیکاتور|اخبار|دفتر سفارش|ماشین‌حساب ریسک|صرافی' },
  layers: { en: 'MARKET DATA|AI AGENTS|QUANT|LIQUIDITY|ORDER FLOW|RISK ENGINE', fa: 'داده بازار|ایجنت‌های AI|کوانت|نقدینگی|جریان سفارش|موتور ریسک' },
  oneWs: { en: 'ONE INTELLIGENT WORKSPACE', fa: 'یک فضای کاری هوشمند' },

  wfK: { en: 'SIMPLE WORKFLOW', fa: 'جریان ساده' },
  wfH: { en: 'FROM MARKET TO DECISION.', fa: 'از بازار تا تصمیم.' },
  wfSteps: { en: 'SELECT MARKET|Choose BTC, ETH, SOL and more.;ANALYZE|Processed through multiple intelligence layers.;REVIEW|Context, AI consensus, risk and setup.;SIMULATE|Paper trading and strategy analysis.;EXECUTE|Optionally connect to exchanges.', fa: 'انتخاب بازار|BTC، ETH، SOL و بیشتر.;تحلیل|پردازش در چند لایه هوش.;بررسی|کانتکست، اجماع، ریسک و ستاپ.;شبیه‌سازی|معامله کاغذی و تحلیل استراتژی.;اجرا|اتصال اختیاری به صرافی.' },

  shotsK: { en: 'INSIDE THE PANEL', fa: 'داخل پنل کاربری' },
  shotsH: { en: 'A LOOK AT THE REAL TERMINAL.', fa: 'نگاهی به ترمینال واقعی.' },
  shot1: { en: 'Chart + AI Consensus', fa: 'چارت + اجماع هوش مصنوعی' },
  shot2: { en: 'The 8-agent network', fa: 'شبکه ۸ ایجنت' },
  shot3: { en: 'Order book + depth', fa: 'دفتر سفارش + عمق' },
  shotsNote: { en: 'Simplified previews of the live panel. Enter the user panel to see real market data.', fa: 'پیش‌نمایش ساده‌شده پنل زنده. برای دیدن داده واقعی وارد پنل کاربری شو.' },

  ctaH1: { en: 'UNDERSTAND THE MARKET.', fa: 'بازار را بفهم.' },
  ctaH2: { en: 'CONTROL THE RISK.', fa: 'ریسک را کنترل کن.' },
  ctaH3: { en: 'TRADE WITH INTELLIGENCE.', fa: 'با هوش معامله کن.' },
  ctaLead: { en: 'PersianTrade brings together real-time market data, AI intelligence, quantitative analysis, liquidity analysis and risk management into one powerful trading workspace.', fa: 'پرشین‌ترید داده لحظه‌ای، هوش مصنوعی، تحلیل کمّی، نقدینگی و مدیریت ریسک را در یک فضای معاملاتی قدرتمند جمع میکند.' },
  cta2: { en: 'ENTER USER PANEL →', fa: 'ورود به پنل کاربری ←' },

  faqK: { en: 'FAQ', fa: 'سوالات متداول' },
  faqH: { en: 'QUESTIONS, ANSWERED HONESTLY.', fa: 'صادقانه پاسخ میدهیم.' },
  faqData: {
    en: 'What is PersianTrade?|PersianTrade is an AI-powered crypto trading intelligence platform: real-time data, specialized agents, weighted consensus, a risk engine with veto power, paper trading and backtesting in one workspace.;Does it guarantee profits?|No. It is an analysis and intelligence platform. Markets are uncertain and no system can guarantee profits.;Does it use real market data?|Yes — live public feeds from Binance, Bybit and OKX. If data goes stale, the system says so and stops new signals.;Can I use it without live trading?|Yes — that is the default. Analysis, signals, paper trading and backtesting need no exchange connection.;Does AI execute trades automatically?|No. AI never sends orders directly. Every trade passes ARES and requires explicit user action.;Which exchanges?|Binance, Bybit and OKX today — new exchanges can be added through the adapter architecture.;Are withdrawal permissions required?|No. Withdrawal permission is never required — and never asked for.',
    fa: 'پرشین‌ترید چیست؟|پلتفرم هوش معاملاتی کریپتو: داده لحظه‌ای، ایجنت‌های تخصصی، اجماع وزنی، موتور ریسک با حق وتو، معامله کاغذی و بک‌تست در یک فضای کاری.;سود تضمین میکند؟|خیر. این یک پلتفرم تحلیل و هوش معاملاتی است. بازار عدم‌قطعیت دارد و هیچ سیستمی سود تضمین نمیکند.;از داده واقعی استفاده میکند؟|بله — فید عمومی زنده بایننس، بای‌بیت و OKX. اگر داده قدیمی شود، سیستم اعلام میکند و صدور سیگنال متوقف میشود.;بدون معامله واقعی قابل استفاده است؟|بله — پیش‌فرض همین است. تحلیل، سیگنال، پیپر و بک‌تست بدون اتصال صرافی کار میکنند.;هوش مصنوعی خودش معامله اجرا میکند؟|خیر. AI مستقیم سفارش نمی‌فرستد. هر معامله اول از آرس عبور میکند و نیاز به اقدام صریح کاربر دارد.;چه صرافی‌هایی؟|امروز Binance، Bybit و OKX؛ با معماری آداپتور، صرافی جدید بدون بازنویسی اضافه میشود.;مجوز برداشت لازم دارد؟|خیر. مجوز برداشت هرگز لازم نیست و درخواست نمیشود.',
  },

  ftrTag: { en: 'AI-POWERED TRADING INTELLIGENCE', fa: 'هوش معاملاتی ارز دیجیتال با AI' },
  legal: { en: 'Terms|Privacy|Risk Disclosure', fa: 'قوانین|حریم خصوصی|افشای ریسک' },
  disclaimer: { en: 'PersianTrade provides market analysis, trading intelligence and technology tools. It does not guarantee profits or investment returns. Cryptocurrency trading involves significant risk. Users are responsible for their own trading decisions.', fa: 'پرشین‌ترید ابزار تحلیل بازار، هوش معاملاتی و فناوری ارائه میدهد و سود یا بازده سرمایه را تضمین نمیکند. معامله ارز دیجیتال ریسک قابل‌توجهی دارد و مسئولیت تصمیمات معاملاتی با کاربر است.' },

  contactK: { en: 'CONTACT', fa: 'ارتباط با ما' },
  contactH: { en: 'WE ARE ONE MESSAGE AWAY.', fa: 'فقط یک پیام فاصله داری.' },
  contactLead: { en: 'For subscription purchase, renewal, deposit address and support — reach us directly. Average response time: under 1 hour during working hours.', fa: 'برای خرید اشتراک، تمدید، دریافت آدرس واریز و پشتیبانی — مستقیم با ما در ارتباط باشید. میانگین زمان پاسخ: کمتر از یک ساعت در ساعات کاری.' },
  tgT: { en: 'TELEGRAM — @persiantrade2025', fa: 'تلگرام — @persiantrade2025' },
  tgD: { en: 'Fastest way: orders, payment confirmation and support.', fa: 'سریع‌ترین راه: ثبت سفارش، تأیید پرداخت و پشتیبانی.' },
  mailT: { en: 'EMAIL — trade@ipeset.com', fa: 'ایمیل — trade@ipeset.com' },
  mailD: { en: 'Formal requests, invoices and documents.', fa: 'درخواست‌های رسمی، فاکتور و مدارک.' },
  tgBtn: { en: 'MESSAGE ON TELEGRAM', fa: 'پیام در تلگرام' },
  mailBtn: { en: 'SEND EMAIL', fa: 'ارسال ایمیل' },
  ftrContact: { en: 'Contact', fa: 'ارتباط با ما' },
};

function useLang(): [L, (l: L) => void, (k: string) => string, (s: string) => string[], (k: string) => string[][]] {
  const [lang, setLang] = useState<L>(() => { try { return localStorage.getItem('pt_lang') === 'en' ? 'en' : 'fa'; } catch { return 'fa'; } });
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    try { localStorage.setItem('pt_lang', lang); } catch { /* noop */ }
  }, [lang]);
  const t = (k: string) => (T[k] ? T[k][lang] : k);
  const tl = (k: string) => t(k).split('|');
  const tr = (k: string) => t(k).split(';').map(r => r.split('|'));
  return [lang, setLang, t, tl, tr];
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function Header({ lang, setLang, t }: any) {
  const [open, setOpen] = useState(false);
  const nav = [['#home', 'navHome'], ['#how', 'navHow'], ['#ai', 'navAI'], ['#features', 'navFeatures'], ['#risk', 'navRisk'], ['#tech', 'navTech'], ['#faq', 'navFaq'], ['#contact', 'ftrContact']];
  return (
    <header className="hdr">
      <div className="hdr-in">
        <a href="#home" className="logo"><img src="./logo.png" alt="PersianTrade" className="logo-img" /></a>
        <nav className="nav">{nav.map(([h, k]) => <a key={h} href={h}>{t(k)}</a>)}</nav>
        <div className="hdr-cta">
          <button className="lang-toggle" onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}>{lang === 'fa' ? 'ENGLISH' : 'فارسی'}</button>
          <a className="btn primary sm" href={TERMINAL}>{t('enterPanel')}</a>
        </div>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">{open ? '✕' : '☰'}</button>
      </div>
      {open && (
        <div className="mob-nav">
          {nav.map(([h, k]) => <a key={h} href={h} onClick={() => setOpen(false)}>{t(k)}</a>)}
          <button className="lang-toggle" onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}>{lang === 'fa' ? 'ENGLISH' : 'فارسی'}</button>
          <a className="btn primary sm" href={TERMINAL}>{t('enterPanel')}</a>
        </div>
      )}
    </header>
  );
}

function Hero({ t }: any) {
  const flow = [[t('f1'), t('f1s')], [t('f2'), t('f2s')], [t('f3'), t('f3s')], [t('f4'), t('f4s')]];
  return (
    <section id="home" className="hero">
      <div className="hero-glow" />
      <div className="wrap hero-grid">
        <div>
          <Reveal>
            <img src="./logo.png" alt="" className="hero-logo" />
            <div className="kicker">{t('heroK')}</div>
            <h1 className="h-xl">{t('h1a')}<br />{t('h1b')}{t('h1c') && <><br /><span className="grad">{t('h1c')}</span></>}</h1>
            <p className="lead">{t('heroLead')}</p>
            <div className="row-gap">
              <a className="btn primary" href="#what">{t('btnExplore')}</a>
              <a className="btn ghost" href="#how">{t('btnHow')}</a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="flow">
            {flow.map(([tt, ss], i) => (
              <div key={tt}>
                <div className="flow-node"><span className="flow-idx">0{i + 1}</span><div><b>{tt}</b><small>{ss}</small></div></div>
                {i < 3 && <div className="flow-link"><span className="dot-run" style={{ animationDelay: `${i * 0.5}s` }} /></div>}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="hero-strip">{t('strip').split('·').map((x: string) => <span key={x}>{x.trim()}</span>)}</div>
    </section>
  );
}

function WhatIs({ t }: any) {
  const cards = [[t('wc1t'), t('wc1d'), 'particles'], [t('wc2t'), t('wc2d'), 'nodes'], [t('wc3t'), t('wc3d'), 'shield']];
  return (
    <section id="what" className="sec">
      <div className="wrap">
        <Reveal><div className="kicker">{t('whatK')}</div><h2>{t('whatH')}</h2><p className="lead narrow">{t('whatLead')}</p></Reveal>
        <div className="grid3">
          {cards.map(([tt, dd, v], i) => (
            <Reveal key={tt} delay={i * 0.1}><div className="card big"><div className={`viz viz-${v}`} aria-hidden /><h3>{tt}</h3><p>{dd}</p></div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem({ t, tl }: any) {
  return (
    <section className="sec alt">
      <div className="wrap center">
        <Reveal><div className="kicker">{t('probK')}</div><h2>{t('probH')}</h2></Reveal>
        <Reveal delay={0.1}>
          <div className="scatter">{tl('pChips').map((c: string, i: number) => <span key={c} className="sc-chip" style={{ '--i': i } as React.CSSProperties}>{c}</span>)}</div>
          <div className="too-much">{t('tooMuch')}</div>
          <div className="arrow-down">↓</div>
          <div className="nexus-pill">PersianTrade</div>
          <div className="arrow-down">↓</div>
          <div className="one-view">{t('oneView')}</div>
        </Reveal>
        <Reveal delay={0.15}><p className="lead narrow center-mt">{t('probLead')}</p></Reveal>
      </div>
    </section>
  );
}

function HowItWorks({ t, tl }: any) {
  const steps = [[t('s1t'), t('s1d')], [t('s2t'), t('s2d')], [t('s3t'), t('s3d')], [t('s4t'), t('s4d')]];
  return (
    <section id="how" className="sec">
      <div className="wrap">
        <Reveal><div className="kicker">{t('howK')}</div><h2>{t('howH')}</h2></Reveal>
        <div className="steps">
          {steps.map(([tt, dd], i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="step"><span className="step-n">0{i + 1}</span><div><h3>{tt}</h3><p>{dd}</p></div></div>
              {i < 3 && <div className="step-arrow">↓</div>}
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="flow-line">{tl('flowWords').map((w: string, i: number, a: string[]) => <span key={w} className="fl-item">{i < a.length - 1 ? <>{w} <em>→</em></> : w}</span>)}</div>
        </Reveal>
      </div>
    </section>
  );
}

function Agents({ t, tr }: any) {
  const agents = tr('agentsData').map(([n, r, a]: string[]) => ({ n, r, a: a.split(',') }));
  return (
    <section id="ai" className="sec alt">
      <div className="wrap">
        <Reveal><div className="kicker">{t('aiK')}</div><h2>{t('aiH')}</h2><p className="lead narrow">{t('aiLead')}</p></Reveal>
        <div className="grid4">
          {agents.map((g: any, i: number) => (
            <Reveal key={g.n} delay={(i % 4) * 0.08}>
              <div className={`card agent ${g.n === 'ARES' ? 'ares' : ''}`}>
                <div className="agent-top"><span className="agent-ic">{g.n === 'ARES' ? '🛡' : '◈'}</span><span className="pulse" /></div>
                <h3>{g.n}</h3><div className="agent-role">{g.r}</div>
                <div className="chips">{g.a.map((x: string) => <span key={x}>{x}</span>)}</div>
                {g.n === 'ARES' && <p className="veto">{t('aresNote')}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Perspectives({ t, tr }: any) {
  const rows = tr('agentsData').slice(0, 7).map(([n, r]: string[]) => [n, r]);
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal><div className="kicker">{t('perspK')}</div><h2>{t('perspH')}</h2></Reveal>
        <Reveal delay={0.1}>
          <div className="net">
            <div className="net-col">{rows.map(([a, b]: string[]) => <div key={a} className="net-node"><b>{a}</b><span>{b}</span></div>)}</div>
            <div className="net-mid"><div className="net-arrow">→</div><div className="consensus-box">{t('consensus')}</div><div className="net-arrow">→</div></div>
            <div className="net-col out">
              <div className="out-long">LONG</div><div className="out-short">SHORT</div><div className="out-no">{t('noTrade')}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function NoTrade({ t, tl }: any) {
  return (
    <section className="sec alt">
      <div className="wrap center">
        <Reveal><div className="kicker">{t('ntK')}</div><h2>{t('ntH')}</h2><p className="lead narrow center-mt">{t('ntLead')}</p></Reveal>
        <div className="cmp">
          <Reveal><div className="card cmp-card yes">
            <div className="chips col">{tl('yesItems').map((x: string) => <span key={x}>{x}</span>)}</div>
            <div className="arrow-down">↓</div><div className="verdict up">{t('tradeSetup')}</div>
          </div></Reveal>
          <Reveal delay={0.1}><div className="card cmp-card no">
            <div className="chips col">{tl('noItems').map((x: string) => <span key={x}>{x}</span>)}</div>
            <div className="arrow-down">↓</div><div className="verdict no">{t('noTrade')}</div>
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}

function Risk({ t, tl }: any) {
  return (
    <section id="risk" className="sec">
      <div className="wrap">
        <Reveal><div className="kicker">{t('riskK')}</div><h2>{t('riskH')}</h2><p className="lead narrow">{t('riskLead')}</p></Reveal>
        <Reveal delay={0.1}>
          <div className="risk-flow">
            <div className="rf-node">{t('rfSignal')}</div><span className="rf-arr">↓</span>
            <div className="rf-node ares">{t('rfAres')}</div><span className="rf-arr">↓</span>
            <div className="rf-split"><div className="rf-node ok">{t('rfOk')}</div><div className="rf-node bad">{t('rfBad')}</div></div>
          </div>
          <div className="chips wrap-chips">{tl('riskItems').map((x: string) => <span key={x}>{x}</span>)}</div>
          <div className="veto-banner">{t('vetoBanner')}</div>
        </Reveal>
      </div>
    </section>
  );
}

function RealData({ t, tl }: any) {
  return (
    <section id="features" className="sec alt">
      <div className="wrap">
        <Reveal><div className="kicker">{t('dataK')}</div><h2>{t('dataH')}</h2></Reveal>
        <div className="grid4">{tl('dataCards').map((c: string, i: number) => <Reveal key={c} delay={(i % 4) * 0.06}><div className="card data-c"><span className="live-dot" />{c}</div></Reveal>)}</div>
        <Reveal delay={0.15}>
          <div className="flow-line data-strip">{tl('dataStrip').map((x: string) => <span key={x}>{x}</span>)}</div>
          <p className="lead narrow center-mt">{t('dataLead')}</p>
        </Reveal>
      </div>
    </section>
  );
}

function SeeBeyond({ t, tl }: any) {
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal><div className="kicker">{t('beyondK')}</div><h2>{t('beyondH')}</h2></Reveal>
        <Reveal delay={0.1}>
          <div className="terminal-mock">
            <div className="tm-bar"><span /><span /><span /></div>
            <div className="tm-body">
              <div className="tm-chart">
                {[38, 52, 44, 60, 55, 70, 64, 78, 72, 66, 80, 74, 88, 82, 90].map((h, i) => <div key={i} className="tm-bar-c" style={{ height: `${h}%` }} />)}
                <div className="tm-zone z1" /><div className="tm-zone z2" />
              </div>
              <div className="tm-side">{tl('beyondRows').map((x: string) => <div key={x} className="tm-row">{x}</div>)}</div>
            </div>
            <div className="tm-label">{t('previewTag')}</div>
          </div>
        </Reveal>
        <Reveal delay={0.15}><p className="lead narrow center-mt">{t('beyondLead')}</p></Reveal>
      </div>
    </section>
  );
}

function MultiTF({ t, tl }: any) {
  const rows = [['5M', 'up'], ['15M', 'up'], ['1H', 'up'], ['4H', 'flat'], ['1D', 'up']];
  const [h1, h2] = tl('tfHead');
  return (
    <section id="tech" className="sec alt">
      <div className="wrap">
        <Reveal><div className="kicker">{t('mtfK')}</div><h2>{t('mtfH')}</h2></Reveal>
        <Reveal delay={0.1}>
          <div className="tf-table">
            <div className="tf-head"><span>{h1}</span><span>{h2}</span></div>
            {rows.map(([a, c]) => <div key={a} className="tf-row"><span>{a}</span><span className={`tf-${c}`}>{c === 'up' ? t('bullish') : t('neutral')}</span></div>)}
            <div className="tf-cons">{t('tfCons')}</div>
          </div>
        </Reveal>
        <Reveal delay={0.15}><p className="lead narrow center-mt">{t('mtfLead')}</p></Reveal>
      </div>
    </section>
  );
}

function Paper({ t, tl }: any) {
  const [a, b, c] = tl('peq');
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal><div className="kicker">{t('paperK')}</div><h2>{t('paperH')}</h2></Reveal>
        <Reveal delay={0.1}>
          <div className="flow-line paper-eq"><span>{a}</span><em>+</em><span>{b}</span><em>=</em><span className="hl">{c}</span></div>
          <p className="lead narrow center-mt">{t('paperLead')}</p>
          <div className="chips wrap-chips">{tl('paperItems').map((x: string) => <span key={x}>{x}</span>)}</div>
        </Reveal>
      </div>
    </section>
  );
}

function Backtest({ t, tl }: any) {
  return (
    <section className="sec alt">
      <div className="wrap">
        <Reveal><div className="kicker">{t('btK')}</div><h2>{t('btH')}</h2><p className="lead narrow">{t('btLead')}</p></Reveal>
        <div className="grid3">{tl('btMetrics').map((x: string, i: number) => <Reveal key={x} delay={(i % 3) * 0.06}><div className="card metric-c"><div className="metric-name">{x}</div><div className="metric-ph">— — —</div></div></Reveal>)}</div>
        <Reveal delay={0.1}><div className="example-tag">{t('exampleTag')}</div></Reveal>
      </div>
    </section>
  );
}

function Live({ t, tl }: any) {
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal><div className="kicker">{t('liveK')}</div><h2>{t('liveH')}</h2><p className="lead narrow">{t('liveLead')}</p></Reveal>
        <Reveal delay={0.1}>
          <div className="flow-line">{tl('liveFlow').map((w: string, i: number, a: string[]) => <span key={w} className="fl-item">{i < a.length - 1 ? <>{w} <em>→</em></> : w}</span>)}</div>
          <div className="exch">{['BINANCE', 'BYBIT', 'OKX'].map(x => <span key={x} className="exch-c">{x}</span>)}</div>
          <div className="veto-banner">{t('liveOptional')}</div>
        </Reveal>
      </div>
    </section>
  );
}

function Security({ t, tr }: any) {
  const cards = tr('secCards');
  return (
    <section className="sec alt">
      <div className="wrap">
        <Reveal><div className="kicker">{t('secK')}</div><h2>{t('secH')}</h2></Reveal>
        <div className="grid3">{cards.map(([a, b]: string[], i: number) => <Reveal key={a} delay={(i % 3) * 0.06}><div className="card sec-c"><h3>🔒 {a}</h3><p>{b}</p></div></Reveal>)}</div>
        <Reveal delay={0.15}><div className="veto-banner soft">{t('wdNote')}</div><p className="lead narrow center-mt">{t('secLead')}</p></Reveal>
      </div>
    </section>
  );
}

function WhoFor({ t, tr }: any) {
  const cards = tr('whoCards');
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal><div className="kicker">{t('whoK')}</div><h2>{t('whoH')}</h2></Reveal>
        <div className="grid4">{cards.map(([a, b]: string[], i: number) => <Reveal key={a} delay={(i % 4) * 0.06}><div className="card"><h3>{a}</h3><p>{b}</p></div></Reveal>)}</div>
      </div>
    </section>
  );
}

function Advantage({ t, tl }: any) {
  return (
    <section className="sec alt">
      <div className="wrap">
        <Reveal><div className="kicker">{t('advK')}</div><h2>{t('advH')}</h2></Reveal>
        <div className="cmp">
          <Reveal><div className="card cmp-card">
            <h3 className="cmp-t">{t('tradTitle')}</h3>
            {tl('tradRows').map((x: string) => <div key={x} className="trad-row">{x}</div>)}
          </div></Reveal>
          <Reveal delay={0.1}><div className="card cmp-card nexus">
            <h3 className="cmp-t grad">PersianTrade</h3>
            <div className="chips wrap-chips">{tl('layers').map((x: string) => <span key={x}>{x}</span>)}</div>
            <div className="arrow-down">↓</div><div className="one-ws">{t('oneWs')}</div>
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}

function Workflow({ t, tr }: any) {
  const steps = tr('wfSteps');
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal><div className="kicker">{t('wfK')}</div><h2>{t('wfH')}</h2></Reveal>
        <div className="wf-row">{steps.map(([a, b]: string[], i: number) => <Reveal key={a} delay={i * 0.08}><div className="wf-step"><span className="step-n">0{i + 1}</span><h4>{a}</h4><p>{b}</p></div></Reveal>)}</div>
      </div>
    </section>
  );
}

function Shots({ t }: any) {
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal><div className="kicker">{t('shotsK')}</div><h2>{t('shotsH')}</h2></Reveal>
        <div className="grid3">
          <Reveal><div className="card shot">
            <div className="shot-tag">{t('shot1')}</div>
            <div className="shot-chart">
              {[30, 45, 40, 58, 52, 66, 60, 74, 70, 82].map((h, i) => <div key={i} className="tm-bar-c" style={{ height: `${h}%` }} />)}
              <div className="tm-zone z1" />
            </div>
            <div className="shot-cons"><b className="up">LONG</b><span>conf 78% · R/R 2.1</span></div>
          </div></Reveal>
          <Reveal delay={0.08}><div className="card shot">
            <div className="shot-tag">{t('shot2')}</div>
            <div className="shot-agents">
              {['NOVA', 'ORION', 'LUMA', 'ATLAS', 'GANN', 'MACRO', 'QUANT', 'ARES'].map(a => <span key={a} className={a === 'ARES' ? 'sg ares' : 'sg'}>{a}</span>)}
            </div>
          </div></Reveal>
          <Reveal delay={0.16}><div className="card shot">
            <div className="shot-tag">{t('shot3')}</div>
            <div className="shot-ob">
              {[67, 66, 65].map((_, i) => <div key={'a' + i} className="ob-a">ask {77100 + i * 10}<i style={{ width: `${30 + i * 25}%` }} /></div>)}
              <div className="ob-mid">77,050.00</div>
              {[1, 2, 3].map((_, i) => <div key={'b' + i} className="ob-b">bid {77040 - i * 10}<i style={{ width: `${55 - i * 15}%` }} /></div>)}
            </div>
          </div></Reveal>
        </div>
        <Reveal delay={0.1}><p className="lead narrow center-mt" style={{ textAlign: 'center', margin: '30px auto 0' }}>{t('shotsNote')}</p>
          <div className="row-gap" style={{ justifyContent: 'center' }}><a className="btn primary" href={TERMINAL}>{t('enterPanel')}</a></div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA({ t }: any) {
  return (
    <section className="final">
      <div className="final-glow" />
      <div className="wrap center">
        <Reveal>
          <img src="./logo.png" alt="PersianTrade" className="hero-logo big" />
          <h2 className="h-xl center-h">{t('ctaH1')}<br />{t('ctaH2')}<br /><span className="grad">{t('ctaH3')}</span></h2>
          <p className="lead narrow center-mt">{t('ctaLead')}</p>
          <div className="row-gap center-row">
            <a className="btn primary lg" href="#what">{t('btnExplore')}</a>
            <a className="btn ghost lg" href={TERMINAL}>{t('cta2')}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq({ t, tr }: any) {
  const [open, setOpen] = useState<number | null>(0);
  const items = tr('faqData');
  return (
    <section id="faq" className="sec alt">
      <div className="wrap narrow">
        <Reveal><div className="kicker">{t('faqK')}</div><h2>{t('faqH')}</h2></Reveal>
        <div className="faq">
          {items.map(([q, a]: string[], i: number) => (
            <div key={i} className={`faq-i ${open === i ? 'on' : ''}`}>
              <button onClick={() => setOpen(open === i ? null : i)}>{q}<span>{open === i ? '−' : '+'}</span></button>
              {open === i && <p>{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ t }: any) {
  return (
    <section id="contact" className="sec">
      <div className="wrap">
        <Reveal><div className="kicker">{t('contactK')}</div><h2>{t('contactH')}</h2><p className="lead narrow">{t('contactLead')}</p></Reveal>
        <div className="grid3" style={{ gridTemplateColumns: '1fr 1fr', maxWidth: 860 }}>
          <Reveal>
            <a className="card contact-c" href="https://t.me/persiantrade2025" target="_blank" rel="noopener noreferrer">
              <div className="c-ic"><img src="./telegram.svg" alt="Telegram" /></div>
              <h3>{t('tgT')}</h3><p>{t('tgD')}</p>
              <span className="btn primary sm">{t('tgBtn')}</span>
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <a className="card contact-c" href="mailto:trade@ipeset.com">
              <div className="c-ic">✉️</div>
              <h3>{t('mailT')}</h3><p>{t('mailD')}</p>
              <span className="btn ghost sm">{t('mailBtn')}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Foot({ t, tl }: any) {
  const nav = [['#how', 'navHow'], ['#ai', 'navAI'], ['#features', 'navFeatures'], ['#risk', 'navRisk'], ['#tech', 'navTech'], ['#faq', 'navFaq']];
  return (
    <footer className="ftr">
      <div className="wrap ftr-grid">
        <div>
          <img src="./logo.png" alt="PersianTrade" className="foot-logo" />
          <p className="ftr-tag">{t('ftrTag')}</p>
        </div>
        <div className="ftr-col"><b>Product</b>{nav.map(([h, k]) => <a key={h} href={h}>{t(k)}</a>)}</div>
        <div className="ftr-col"><b>Legal</b>{tl('legal').map((x: string) => <a key={x} href="#faq">{x}</a>)}</div>
        <div className="ftr-col"><b>{t('ftrContact')}</b>
          <a href="https://t.me/persiantrade2025" target="_blank" rel="noopener noreferrer"><img src="./telegram.svg" className="tg-ic" alt="" /> Telegram — @persiantrade2025</a>
          <a href="mailto:trade@ipeset.com">✉️ trade@ipeset.com</a>
          <a href={TERMINAL}>{t('enterPanel')}</a>
        </div>
      </div>
      <div className="wrap ftr-disc">{t('disclaimer')}</div>
    </footer>
  );
}

export default function App() {
  const [lang, setLang, t, tl, tr] = useLang();
  return (
    <>
      <Header lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} /><WhatIs t={t} /><Problem t={t} tl={tl} /><HowItWorks t={t} tl={tl} /><Agents t={t} tr={tr} /><Perspectives t={t} tr={tr} /><NoTrade t={t} tl={tl} /><Risk t={t} tl={tl} /><RealData t={t} tl={tl} /><SeeBeyond t={t} tl={tl} /><MultiTF t={t} tl={tl} /><Paper t={t} tl={tl} /><Backtest t={t} tl={tl} /><Live t={t} tl={tl} /><Security t={t} tr={tr} /><WhoFor t={t} tr={tr} /><Advantage t={t} tl={tl} /><Workflow t={t} tr={tr} /><Shots t={t} /><FinalCTA t={t} /><Faq t={t} tr={tr} /><Contact t={t} />
      </main>
      <Foot t={t} tl={tl} />
    </>
  );
}
