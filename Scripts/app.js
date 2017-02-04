var Zena;
(function (Zena) {
    var ctl = Zena.UI.Controls;
    var ui = Zena.UI;
    var ThemeSelectViewModel = (function () {
        function ThemeSelectViewModel(parent) {
            this.placeHolder = "Select a theme";
            var that = this;
            this._parent = parent;
            this.themeSelected = ko.observable();
            this.themeSelected(new ctl.MenuItem("Purple", "Purple Theme", "purple"));
            this.themeSelected.subscribe(function (newValue) {
                console.log("Theme:", newValue.text(), "input:");
                $("body").fadeOut(function () {
                    var theme = newValue.data();
                    that.switchTheme(theme);
                    if (theme == "dark") {
                        $("#main").css("background-color", "black");
                    }
                    else {
                        $("#main").css("background-color", "white");
                    }
                    setTimeout(function () {
                        $("body").fadeIn(300);
                        console.log(that.instance());
                        if (that.instance()) {
                            that.instance().refresh();
                        }
                        that._parent.input.refresh();
                        that._parent.comboInput.refresh();
                    }, 200);
                });
            });
            this._items = [];
            this._items.push(new ctl.MenuItem("Purple", "Purple Theme", "purple"));
            this._items.push(new ctl.MenuItem("Dark", "Dark Theme", "dark"));
            this._items.push(new ctl.MenuItem("Light", "Light Theme", "light"));
            this._items.push(new ctl.MenuItem("Gold", "Gold Theme", "gold"));
            this._items.push(new ctl.MenuItem("Amber", "Amber", "amber"));
            this.themeProvider = ko.observable();
            this.themeProvider(function (e) {
                e.data(that._items);
                e.done();
            });
            this.instance = ko.observable();
            this.instance.subscribe(function (value) {
                that._parent.themeInput = value;
            });
        }
        ThemeSelectViewModel.prototype.switchTheme = function (newTheme) {
            $('link[rel="stylesheet"]').each(function () {
                if (this.href.indexOf("/scss/themes") > 0) {
                    var href = this.href;
                    href = href.replace(/\/themes\/[A-Za-z0-9\-_]+\/[a-z0-9]+/ig, "/themes/" + newTheme + "/" + newTheme);
                    this.href = href;
                }
            });
        };
        ThemeSelectViewModel.prototype.activate = function () {
            ko.applyBindings(this, $("#themeselect")[0]);
        };
        return ThemeSelectViewModel;
    }());
    var ComboBoxViewModel = (function () {
        function ComboBoxViewModel(parent) {
            this.instance = ko.observable();
            this.instance.subscribe(function (newValue) {
                parent.comboInput = newValue;
            });
            this.selectedMonitor = ko.observable();
        }
        ComboBoxViewModel.prototype.activate = function () {
            ko.applyBindings(this, $("#comobox")[0]);
        };
        return ComboBoxViewModel;
    }());
    var Application = (function () {
        function Application() {
            ui.Knockout.KnockoutExtension.registerComponents();
        }
        Application.prototype.activateScroll = function () {
            var bar = $("#scrollbar");
            var thumb = $("#thumb");
            bar.width(10);
            thumb.css("top", 15);
            var left = bar.parent().innerWidth() - bar.outerWidth();
            console.log("bar:", bar.width());
            console.log("width:", left);
            var rad = bar.innerWidth() / 2;
            thumb.css("border-radius", 5);
            thumb.width(bar.innerWidth());
            bar.css("left", left);
        };
        Application.prototype.setScrollbarWidth = function (w) {
            var bar = $("#scrollbar");
            var thumb = $("#thumb");
        };
        Application.prototype.wrap = function (x) {
            if (typeof x === "function") {
                return x;
            }
            return function () {
                return x;
            };
        };
        Application.prototype.getValue = function () {
            return 1000;
        };
        Application.prototype.run = function () {
            var that = this;
            var input = new ctl.InputBox();
            this.input = input;
            input.width(300);
            var types = this.getLogTypes();
            for (var i = 0; i < types.length; i++) {
                input.itemsAdd(types[i].displayName, types[i].helpText, types[i].id);
            }
            input.placeHolder("Search");
            var z = input.render($("#input123"));
            input.onItemClick(function (e) {
                var item = e.data();
                console.log("click:", item.text(), "[", item.data(), "]");
            });
            input.onItemsPopulated(function (e) {
                console.log("Item Populated");
            });
            input.onBeforeFilterItems(function (filter) {
                console.log("onBeforeFilterItems:", filter);
                return filter;
            });
            //input.onFilterItem(function (item: ctl.MenuItem) {
            //	//console.log(item.text());
            //	//if (item.text().indexOf("W") == 0) {					
            //	//	return item;
            //	//}
            //	//return null;
            //	return item;
            //});
            var themeSel = new ThemeSelectViewModel(this);
            themeSel.activate();
            var combo = new ComboBoxViewModel(this);
            combo.activate();
            var menu = new ctl.Menu("Test", ctl.Menu.MenuType.DEFAULT);
            menu.add(new ctl.MenuItem("Caché Console Error Counts"));
            menu.add(new ctl.MenuItem("Items 1"));
            menu.add(new ctl.MenuItem("Items 2"));
            menu.add(new ctl.MenuItem("Items 3"));
            menu.add(new ctl.MenuItem("Items 4"));
            menu.add(new ctl.MenuItem("Items 5"));
            menu.add(new ctl.MenuItem("Items 6"));
            menu.add(new ctl.MenuItem("Items 7"));
            menu.add(new ctl.MenuItem("Really Long Long Long Long item"));
            menu.render($("#menu"));
            menu.visible(false);
            this.setupShortCuts(input, menu);
            var scrollBar = new ctl.Scrollbar();
            scrollBar.render($("#scroll-view"));
            //this.testD3();
            var m = new ctl.Movable();
            //m.render($("#scroll-view"));
            m.on(ctl.Movable.Events.BEFORE_MOVE, function (e) {
                //e.cancel();
            });
            m.on(ctl.Movable.Events.MOVE, function (e) {
                //var pos: ctl.Position = e.data();
                //console.log("moved: ", pos.left, pos.top);
            });
            m.on(ctl.Movable.Events.AFTER_MOVE, function (e) {
                //console.log("after move");
            });
            var button = new ctl.Button("Test Button", "help text");
            button.render($("#button1"));
            button.onClick(function () {
                console.log("button click!");
            });
            var item = new ctl.ListViewItem("My Test checkbox", "help text");
            item.hasCheckBox(true);
            item.render("#check1");
            var x = this.wrap(this.getValue);
            console.log(x.call(this));
            console.log(this.getName()); // MyClass		
            //$(window).on('mousewheel DOMMouseScroll', function (e) {
            //	console.log("wheel:",e.target);
            //	//if (e.originalEvent.de / 120 > 0) {
            //	//	$(this).text('scrolling up !');
            //	//}
            //	//else {
            //	//	$(this).text('scrolling down !');
            //	//}
            //});
            //var target = $("#scroll-view")[0];
            //var mousein = false;
            //$("#scroll-view").on("mouseover", function (e) {
            //	mousein = true;
            //	console.log("mouse in");
            //	that.disableScroll();
            //})
            //.on("mouseout", function (e) {
            //	mousein = false;
            //	that.enableScroll();
            //	console.log("mouse out");
            //});
            //$("#scroll-view").on("mousewheel DOMMouseScroll", function (e) {
            //	console.log("DOM Wheel");
            //	e.preventDefault();
            //	e.stopPropagation();
            //});
            //if (window.addEventListener) {
            //	target.addEventListener('DOMMouseScroll', function (e) {
            //		e = e || window.event;
            //		if (e.preventDefault)
            //			e.preventDefault();
            //		e.returnValue = false;  
            //		//e.preventDefault();
            //		//e.stopPropagation();
            //		console.log("DOM wheel");
            //		return false;
            //	}, false);
            //	target.addEventListener('mousewheel', function () {
            //		console.log("mouseweel");
            //	}, false);
            //}
            //else {
            //	//document.attachEvent("onmousewheel", _onWheel)
            //}
            console.log("Running");
        };
        Application.prototype.preventDefault = function (e) {
            e = e || window.event;
            console.log("event:", e.type);
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        };
        Application.prototype.disableScroll = function () {
            //if (window.addEventListener) // older FF
            //	window.addEventListener('DOMMouseScroll', this.preventDefault, false);
            //window.onwheel = this.preventDefault; // modern standard
            //window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
            //window.ontouchmove = this.preventDefault; // mobile
            $(window).on("wheel", this.preventDefault)
                .on("mousewheel", this.preventDefault);
            $(document).on("mousewheel", this.preventDefault);
        };
        Application.prototype.enableScroll = function () {
            $(window).off("wheel")
                .off("mousewheel");
            $(document).off("mousewheel");
            //if (window.removeEventListener)
            //	window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
            //window.onmousewheel = document.onmousewheel = null;
            //window.onwheel = null;
            //window.ontouchmove = null;
            //document.onkeydown = null;
        };
        Application.prototype.getName = function () {
            return this.constructor.name;
            // OR return (this as any).constructor.name;
        };
        Application.prototype.switchTheme = function (newTheme) {
            $('link[rel="stylesheet"]').each(function () {
                if (this.href.indexOf("/scss/themes") > 0) {
                    var href = this.href;
                    href = href.replace(/\/themes\/[A-Za-z0-9\-_]+\/[a-z0-9]+/ig, "/themes/" + newTheme + "/" + newTheme);
                    this.href = href;
                }
            });
        };
        Application.prototype.setupShortCuts = function (input, menu) {
            var that = this;
            $("#gold").on("click", function (e) {
                var obj;
                $("body").fadeOut(function () {
                    that.switchTheme("gold");
                    $("#main").css("background-color", "white");
                    setTimeout(function () {
                        $("body").fadeIn(300);
                        input.refresh();
                        that.themeInput.refresh();
                        that.comboInput.refresh();
                    }, 200);
                });
            });
            $("#dark").on("click", function (e) {
                var obj;
                $("body").fadeOut(function () {
                    that.switchTheme("dark");
                    $("#main").css("background-color", "black");
                    setTimeout(function () {
                        $("body").fadeIn(300);
                        input.refresh();
                        that.themeInput.refresh();
                        that.comboInput.refresh();
                    }, 200);
                });
            });
            $("#light").on("click", function (e) {
                var obj;
                $("body").fadeOut(function () {
                    that.switchTheme("light");
                    $("#main").css("background-color", "white");
                    setTimeout(function () {
                        $("body").fadeIn(300);
                        input.refresh();
                        that.themeInput.refresh();
                        that.comboInput.refresh();
                    }, 200);
                });
            });
            $("#amber").on("click", function (e) {
                var obj;
                $("body").fadeOut(function () {
                    that.switchTheme("amber");
                    $("#main").css("background-color", "white");
                    setTimeout(function () {
                        $("body").fadeIn(300);
                        input.refresh();
                        that.themeInput.refresh();
                        that.comboInput.refresh();
                    }, 200);
                });
            });
            $("#toggle").on("click", function (e) {
                if (input.disabled()) {
                    input.disabled(false);
                }
                else {
                    input.disabled(true);
                }
            });
            $("#makecall").on("click", function (e) {
                $("#makecall")[0].requestFullscreen();
                //$.ajax({
                //	url: 'api/RecordSelect',
                //	type: 'GET',
                //	data: {
                //		query: JSON.stringify("")
                //	},
                //	dataType: 'json',
                //	success: function (data) {
                //		console.log("success", data);
                //	},
                //	error: function (data, textStatus) {
                //		console.error("error:" + textStatus);
                //	},
                //	statusCode: {
                //		404: function () {
                //			console.error('http connection failed');
                //		}
                //	}
                //});
            });
            $("#showmenu").on("click", function (e) {
                setTimeout(function () {
                    menu.visible(true);
                    menu.focus();
                });
            });
        };
        Application.prototype.funcA = function (a, b, c) {
            console.log("funcA:", a, b, c);
        };
        Application.prototype.callAsync = function (func, context) {
            var any = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                any[_i - 2] = arguments[_i];
            }
            var args = [];
            if (arguments.length > 2) {
                for (var i = 2; i < arguments.length; i++) {
                    args.push(arguments[i]);
                }
            }
            setTimeout(function () {
                func.apply(context, args);
            });
        };
        Application.prototype.funcB = function (a) {
            console.log("FuncB:", arguments.length);
        };
        Application.prototype.testD3 = function () {
            // Set the dimensions of the canvas / graph
            var margin = { top: 30, right: 20, bottom: 30, left: 50 }, width = 600 - margin.left - margin.right, height = 270 - margin.top - margin.bottom;
            // Parse the date / time
            var parseDate = d3.time.format("%d-%b-%y").parse;
            // Set the ranges
            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);
            // Define the axes
            var xAxis = d3.svg.axis().scale(x)
                .orient("bottom").ticks(5);
            var yAxis = d3.svg.axis().scale(y)
                .orient("left").ticks(5);
            // Define the line
            var valueline = d3.svg.line()
                .x(function (d) {
                return x(d.date);
            })
                .y(function (d) {
                return y(d.close);
            });
            // Adds the svg canvas
            var svg = d3.select("body")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            // Get the data
            //d3.csv("data.csv", function(error, data) {
            var data = this.getData();
            data.forEach(function (d) {
                d.date = parseDate(d.date);
                d.close = +d.close;
            });
            // Scale the range of the data
            x.domain(d3.extent(data, function (d) {
                return d.date;
            }));
            y.domain([0, d3.max(data, function (d) {
                    return d.close;
                })]);
            // Add the valueline path.
            svg.append("path")
                .attr("class", "line")
                .attr("d", valueline(data));
            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);
            //});
        };
        Application.prototype.getData = function () {
            var data = [
                { date: "1-May-12", close: 58.13 },
                { date: "30-Apr-12", close: 53.98 },
                { date: "27-Apr-12", close: 67.00 },
                { date: "26-Apr-12", close: 89.70 },
                { date: "25-Apr-12", close: 99.00 },
                { date: "24-Apr-12", close: 130.28 },
                { date: "23-Apr-12", close: 166.70 },
                { date: "20-Apr-12", close: 234.98 },
                { date: "19-Apr-12", close: 345.44 },
                { date: "18-Apr-12", close: 443.34 },
                { date: "17-Apr-12", close: 543.70 },
                { date: "16-Apr-12", close: 580.13 },
                { date: "13-Apr-12", close: 605.23 },
                { date: "12-Apr-12", close: 622.77 },
                { date: "11-Apr-12", close: 626.20 },
                { date: "10-Apr-12", close: 628.44 },
                { date: "9-Apr-12", close: 636.23 },
                { date: "5-Apr-12", close: 633.68 },
                { date: "4-Apr-12", close: 624.31 },
                { date: "3-Apr-12", close: 629.32 },
                { date: "2-Apr-12", close: 618.63 },
                { date: "30-Mar-12", close: 599.55 },
                { date: "29-Mar-12", close: 609.86 },
                { date: "28-Mar-12", close: 617.62 },
                { date: "27-Mar-12", close: 614.48 },
                { date: "26-Mar-12", close: 606.98 }
            ];
            return data;
        };
        Application.prototype.getLogTypes = function () {
            var logtypes = [
                {
                    displayName: "Application Pool Status",
                    id: 204,
                    helpText: "IIS application pool performance counters"
                },
                {
                    displayName: "Archiving Error and Timeout Details",
                    id: 402,
                    helpText: "Archiving error and timeout details"
                },
                {
                    displayName: "Archiving Integrity Check Status",
                    id: 96,
                    helpText: "Results of the Archiving Integrity Check utility"
                },
                {
                    displayName: "Archiving Metrics",
                    id: 401,
                    helpText: "Archiving metrics"
                },
                {
                    displayName: "ASP Performance",
                    id: 192,
                    helpText: "ASP performance counters"
                },
                {
                    displayName: "ASP.NET Performance",
                    id: 193,
                    helpText: "ASP.NET global performance counters"
                },
                {
                    displayName: "ASP.NET Performance by Application",
                    id: 194,
                    helpText: "ASP.NET application performance counters"
                },
                {
                    displayName: "ASP.NET Performance by Application (Daily summary)",
                    id: 1001942,
                    helpText: "Daily summary of ASP.NET application performance counters"
                },
                {
                    displayName: "ASP.NET Performance by Application (Monthly summary)",
                    id: 1001945,
                    helpText: "Monthly summary of ASP.NET application performance counters"
                },
                {
                    displayName: "ASP.NET Performance by Application (Weekly summary)",
                    id: 1001943,
                    helpText: "Weekly summary of ASP.NET application performance counters"
                },
                {
                    displayName: "ASP.NET Performance by Application v4",
                    id: 196,
                    helpText: "ASP.NET application performance counters v4.0.30319"
                },
                {
                    displayName: "ASP.NET Performance v4",
                    id: 195,
                    helpText: "ASP.NET global performance counters v4.0.30319"
                },
                {
                    displayName: "Average Disk Read Performance",
                    id: 225,
                    helpText: "System wide average block-read performance"
                },
                {
                    displayName: "Average Disk Read Performance (Hourly summary)",
                    id: 1002251,
                    helpText: "Hourly summary of System wide average block-read performance"
                },
                {
                    displayName: "Average Disk Read Performance (Peak-Daily summary)",
                    id: 1002254,
                    helpText: "Peak-Daily summary of System wide average block-read performance"
                },
                {
                    displayName: "Batch Scheduler Run History",
                    id: 230,
                    helpText: "Batch scheduler run history statistics"
                },
                {
                    displayName: "Batch Scheduler Status",
                    id: 24,
                    helpText: "Status of batch scheduler jobs"
                },
                {
                    displayName: "BCA Client Status Metrics",
                    id: 205,
                    helpText: "Metrics for the health and maintenance of BCA PCs and BCA Web servers."
                },
                {
                    displayName: "Billing Background Process Status",
                    id: 85,
                    helpText: "Status of billing filers and the Charge Router daemon"
                },
                {
                    displayName: "Bridges Interface Status",
                    id: 16,
                    helpText: "Status of interface queues and filers"
                },
                {
                    displayName: "Caché Busiest Processes",
                    id: 12,
                    helpText: "Busiest processes on the Caché instance"
                },
                {
                    displayName: "Caché CCONSOLE  Error Counts",
                    id: 700,
                    helpText: "CCONSOLE error counts"
                },
                {
                    displayName: "Caché Database Integrity Check Status",
                    id: 94,
                    helpText: "Status of Caché Database integrity checks"
                },
                {
                    displayName: "Caché Database Size",
                    id: 3,
                    helpText: "Caché database usage and growth metrics"
                },
                {
                    displayName: "Caché Global Size (Chronicles)",
                    id: 51,
                    helpText: "Size in MB of Chronicles Master File Caché globals (with dataset information)"
                },
                {
                    displayName: "Caché Global Size (Non-Chronicles)",
                    id: 49,
                    helpText: "Size in MB of Non-Chronicles Caché globals (with dataset information)"
                },
                {
                    displayName: "Caché Growth Projections",
                    id: 302,
                    helpText: "Growth rate and projected size metrics of datasets and file systems"
                },
                {
                    displayName: "Caché Health Flags",
                    id: 6,
                    helpText: "Caché instance-level health indicators"
                },
                {
                    displayName: "Caché Host CPU Usage",
                    id: 1,
                    helpText: "CPU usage and memory metrics"
                },
                {
                    displayName: "Caché Host CPU Usage (Hourly summary)",
                    id: 1000011,
                    helpText: "Hourly summary of CPU usage and memory metrics"
                },
                {
                    displayName: "Caché Host CPU Usage (Peak-Daily summary)",
                    id: 1000014,
                    helpText: "Peak-Daily summary of CPU usage and memory metrics"
                },
                {
                    displayName: "Caché Host Disk Performance",
                    id: 220,
                    helpText: "Average block-read performance for selected files"
                },
                {
                    displayName: "Caché Host Filesystem Size",
                    id: 2,
                    helpText: "OS filesystem usage and growth metrics"
                },
                {
                    displayName: "Caché Host Memory",
                    id: 800,
                    helpText: "Caché host memory metrics"
                },
                {
                    displayName: "Caché Host Ping",
                    id: 130,
                    helpText: "Status of network ping tests to Caché hosts"
                },
                {
                    displayName: "Caché Instance Error Counts",
                    id: 27,
                    helpText: "%ER errors not in Epic Environments (%SYS, syslog, cconsole, EPICSEC)"
                },
                {
                    displayName: "Caché Instance Failover",
                    id: 998,
                    helpText: "Flag indicating that System Pulse detected a failover between this resource and another resource"
                },
                {
                    displayName: "Caché Journaling",
                    id: 7,
                    helpText: "Caché journal status and metrics"
                },
                {
                    displayName: "Caché License Usage",
                    id: 8,
                    helpText: "Caché license usage"
                },
                {
                    displayName: "Caché License Usage (Daily summary)",
                    id: 1000082,
                    helpText: "Daily summary of Caché license usage"
                },
                {
                    displayName: "Caché License Usage (Hourly summary)",
                    id: 1000081,
                    helpText: "Hourly summary of Caché license usage"
                },
                {
                    displayName: "Caché License Usage (Peak-Daily summary)",
                    id: 1000084,
                    helpText: "Peak-Daily summary of Caché license usage"
                },
                {
                    displayName: "Caché License Usage (Weekly summary)",
                    id: 1000083,
                    helpText: "Weekly summary of Caché license usage"
                },
                {
                    displayName: "Caché Lock Table Usage",
                    id: 9,
                    helpText: "Caché lock table usage"
                },
                {
                    displayName: "Caché Performance",
                    id: 5,
                    helpText: "Caché instance-level performance metrics"
                },
                {
                    displayName: "Caché Performance (Hourly summary)",
                    id: 1000051,
                    helpText: "Hourly summary of Caché instance-level performance metrics"
                },
                {
                    displayName: "Caché Performance (Monthly summary)",
                    id: 1000055,
                    helpText: "Monthly summary of Caché instance-level performance metrics"
                },
                {
                    displayName: "Caché Performance (Peak-Daily summary)",
                    id: 1000054,
                    helpText: "Peak-Daily summary of Caché instance-level performance metrics"
                },
                {
                    displayName: "Caché Performance (Weekly summary)",
                    id: 1000053,
                    helpText: "Weekly summary of Caché instance-level performance metrics"
                },
                {
                    displayName: "Caché Performance By Process Type",
                    id: 11,
                    helpText: "Caché process type-specific activity metrics"
                },
                {
                    displayName: "Caché Performance By Process Type (Hourly summary)",
                    id: 1000111,
                    helpText: "Hourly summary of Caché process type-specific activity metrics"
                },
                {
                    displayName: "Caché Performance By Process Type (Peak-Daily summary)",
                    id: 1000114,
                    helpText: "Peak-Daily summary of Caché process type-specific activity metrics"
                },
                {
                    displayName: "Caché Performance By Process Type (Weekly summary)",
                    id: 1000113,
                    helpText: "Weekly summary of Caché process type-specific activity metrics"
                },
                {
                    displayName: "Caché Shadow Latency",
                    id: 10,
                    helpText: "Caché shadow latency and errors"
                },
                {
                    displayName: "Caché Write Daemon Performance",
                    id: 82,
                    helpText: "Caché write daemon cycle statistics"
                },
                {
                    displayName: "Caché Write Daemon Performance (Hourly summary)",
                    id: 1000821,
                    helpText: "Hourly summary of Caché write daemon cycle statistics"
                },
                {
                    displayName: "Caché Write Daemon Performance (Peak-Daily summary)",
                    id: 1000824,
                    helpText: "Peak-Daily summary of Caché write daemon cycle statistics"
                },
                {
                    displayName: "Care Everywhere Usage",
                    id: 97,
                    helpText: "Counts related to the use of Care Everywhere"
                },
                {
                    displayName: "Certificate Expiration",
                    id: 636,
                    helpText: "Certificate expiration dates"
                },
                {
                    displayName: "Chart Sync Batch Run Performance",
                    id: 83,
                    helpText: "Status information for Chart Sync batch runs"
                },
                {
                    displayName: "Chart Sync Conflict Counts",
                    id: 25,
                    helpText: "Counts of Chart Sync conflicts (IntraConnect)"
                },
                {
                    displayName: "Chart Sync Exception Counts",
                    id: 26,
                    helpText: "Counts of Chart Sync exceptions (IntraConnect)"
                },
                {
                    displayName: "Chart Sync Message Counts by Deployment",
                    id: 88,
                    helpText: "Chart Sync incoming and outgoing message counts by deployment"
                },
                {
                    displayName: "Chart Sync Message Counts by INI",
                    id: 89,
                    helpText: "Chart Sync message counts by message type and INI"
                },
                {
                    displayName: "Chart Sync Message Counts by Priority",
                    id: 86,
                    helpText: "Chart Sync message counts by message type and priority"
                },
                {
                    displayName: "Chart Sync Sidetrack Queue Message Status",
                    id: 87,
                    helpText: "Chart Sync sidetracked queue message details"
                },
                {
                    displayName: "Chronicles Record Counts",
                    id: 50,
                    helpText: "Record and contact counts for Chronicles Master Files"
                },
                {
                    displayName: "Citrix IMA Networking",
                    id: 66,
                    helpText: "Citrix IMA Networking metrics"
                },
                {
                    displayName: "Clarity Console Performance",
                    id: 33,
                    helpText: "Clarity Console statistics"
                },
                {
                    displayName: "Clarity Data Volume Alerts",
                    id: 99,
                    helpText: "Clarity Data Volume Alerts"
                },
                {
                    displayName: "Clarity Delay Track Counts",
                    id: 34,
                    helpText: "Total number of records and table IDs processed in the delay build for each INI in this environment"
                },
                {
                    displayName: "Clarity Filesystem Size",
                    id: 32,
                    helpText: "Clarity-related filesystem statistics"
                },
                {
                    displayName: "Clarity Java Listener (JLC) Status",
                    id: 52,
                    helpText: "Clarity Java Listener Component status information"
                },
                {
                    displayName: "EMFI Category Message Performance",
                    id: 80,
                    helpText: "EMFI category related message statistics"
                },
                {
                    displayName: "EMFI Error Counts",
                    id: 81,
                    helpText: "EMFI errors counts"
                },
                {
                    displayName: "EMFI Record Message Performance",
                    id: 79,
                    helpText: "EMFI record related message statistics"
                },
                {
                    displayName: "EMFI\/Data Courier Dataset Usage",
                    id: 84,
                    helpText: "Free space in the Data Courier and EMFI datasets"
                },
                {
                    displayName: "Epic Application Event Counts",
                    id: 19,
                    helpText: "Counts for Epic application events"
                },
                {
                    displayName: "Epic Client Machine Info",
                    id: 95,
                    helpText: "Client machine information"
                },
                {
                    displayName: "Epic Environment Error Counts",
                    id: 4,
                    helpText: "%ER errors in Epic Environments"
                },
                {
                    displayName: "Epic Environment Error Counts (Daily summary)",
                    id: 1000042,
                    helpText: "Daily summary of %ER errors in Epic Environments"
                },
                {
                    displayName: "Epic Environment Error Counts (Monthly summary)",
                    id: 1000045,
                    helpText: "Monthly summary of %ER errors in Epic Environments"
                },
                {
                    displayName: "Epic Environment Error Counts (Weekly summary)",
                    id: 1000043,
                    helpText: "Weekly summary of %ER errors in Epic Environments"
                },
                {
                    displayName: "Epic Environment Error Details",
                    id: 22,
                    helpText: "Detailed information about errors in Epic Environments"
                },
                {
                    displayName: "Epic Environment Print Queues",
                    id: 46,
                    helpText: "EPS print queue status"
                },
                {
                    displayName: "Epic Generic Queue Status",
                    id: 13,
                    helpText: "Status of Foundations\/Generic queues"
                },
                {
                    displayName: "Epic HDY Error Summary",
                    id: 183,
                    helpText: "Statistics for application errors logged to HDY"
                },
                {
                    displayName: "Epic Interprocess Communication",
                    id: 14,
                    helpText: "Status of interprocess communication"
                },
                {
                    displayName: "Epic Print Service Caché Filer Error Counts",
                    id: 202,
                    helpText: "Caché Filer errors"
                },
                {
                    displayName: "Epic Print Service Event Manager Error Counts",
                    id: 201,
                    helpText: "Event Manager errors"
                },
                {
                    displayName: "Epic Print Service Job Status",
                    id: 37,
                    helpText: "Epic Print Service print job status information"
                },
                {
                    displayName: "Epic Print Service Performance",
                    id: 36,
                    helpText: "Epic Print Service metrics"
                },
                {
                    displayName: "Epic Relay Service Pending File Status",
                    id: 203,
                    helpText: "Status metrics of unprocessed jobs"
                },
                {
                    displayName: "Epic Relay Service Performance",
                    id: 98,
                    helpText: "Epic Relay Service metrics"
                },
                {
                    displayName: "Epic System Latency Metrics",
                    id: 291,
                    helpText: "Caché replication latency and errors"
                },
                {
                    displayName: "EUEM Round Trip Metrics",
                    id: 256,
                    helpText: "Citrix EUEM Round Trip Metrics"
                },
                {
                    displayName: "Hyperspace Instrumentation Summary Data",
                    id: 20,
                    helpText: "Hyperspace response time summary information"
                },
                {
                    displayName: "Hyperspace Web",
                    id: 197,
                    helpText: "Hyperspace Web counters"
                },
                {
                    displayName: "ICA Session Network Statistics",
                    id: 142,
                    helpText: "Statistics of ICA session network performance"
                },
                {
                    displayName: "IIS Worker Processes",
                    id: 77,
                    helpText: "IIS worker process performance counters"
                },
                {
                    displayName: "Interconnect Connections",
                    id: 78,
                    helpText: "Interconnect connection pool counters"
                },
                {
                    displayName: "Interconnect Errors",
                    id: 31,
                    helpText: "Detailed information about errors that occur in Interconnect"
                },
                {
                    displayName: "Interconnect Performance",
                    id: 17,
                    helpText: "Interconnect performance counter values"
                },
                {
                    displayName: "Interconnect Web Service Usage",
                    id: 18,
                    helpText: "Interconnect web service usage statistics"
                },
                {
                    displayName: "LDAP Connection Status",
                    id: 93,
                    helpText: "LDAP connection status by record ID"
                },
                {
                    displayName: "MSAS Connection Metrics",
                    id: 403,
                    helpText: "MSAS Connection Metrics"
                },
                {
                    displayName: "MSAS Memory Metrics",
                    id: 404,
                    helpText: "MSAS Memory Metrics"
                },
                {
                    displayName: "MSAS Processing Metrics",
                    id: 405,
                    helpText: "MSAS Processing Metrics"
                },
                {
                    displayName: "No Data for Caché Host",
                    id: 999,
                    helpText: "Flag denoting if a Caché host hasn't received data for a period of time"
                },
                {
                    displayName: "No Data for Caché Instance",
                    id: 992,
                    helpText: "Flag denoting if a Caché instance hasn't received data for a period of time"
                },
                {
                    displayName: "No Data for Citrix Farm",
                    id: 991,
                    helpText: "Flag denoting if a Citrix farm hasn't received data for a period of time"
                },
                {
                    displayName: "No Data for Epic Environment",
                    id: 993,
                    helpText: "Flag denoting if an Epic environment hasn't received data for a period of time"
                },
                {
                    displayName: "No Data for Epic Print Service",
                    id: 996,
                    helpText: "Flag denoting if an EPS instance hasn't received data for a period of time"
                },
                {
                    displayName: "No Data for Epic Relay Service",
                    id: 997,
                    helpText: "Flag denoting if a Relay service instance hasn't received data for a period of time"
                },
                {
                    displayName: "No Data for Hyperspace Web",
                    id: 990,
                    helpText: "Flag denoting if a Hyperspace Web instance hasn't received data for a period of time"
                },
                {
                    displayName: "No Data for Interconnect",
                    id: 995,
                    helpText: "Flag denoting if an Interconnect instance hasn't received data for a period of time"
                },
                {
                    displayName: "No Data for Welcome Kiosk",
                    id: 889,
                    helpText: "Flag denoting if a Welcome kiosk instance hasn't received data for a period of time"
                },
                {
                    displayName: "No Data for Windows Host",
                    id: 994,
                    helpText: "Flag denoting if a Windows host hasn't received data for a period of time"
                },
                {
                    displayName: "NodeAgent Data Archiver Performance",
                    id: 133,
                    helpText: "Data Archiver compression report"
                },
                {
                    displayName: "NodeAgent Error Counts",
                    id: 134,
                    helpText: "Node Agent errors"
                },
                {
                    displayName: "NodeAgent Filesystem Queue Health",
                    id: 132,
                    helpText: "Nodeagent queues health"
                },
                {
                    displayName: "NodeAgent Performance",
                    id: 135,
                    helpText: "Node Agent Filing Stats"
                },
                {
                    displayName: "NUMA Node Memory",
                    id: 420,
                    helpText: "NUMA Node Memory"
                },
                {
                    displayName: "PCoIP Session Network Statistics",
                    id: 143,
                    helpText: "Statistics of PCoIP session network performance"
                },
                {
                    displayName: "Per Processor Network Interface Card Activity",
                    id: 421,
                    helpText: "Per Processor Network Interface Card Activity"
                },
                {
                    displayName: "Preloading Metrics",
                    id: 161,
                    helpText: "Preloading metrics"
                },
                {
                    displayName: "Processor Information",
                    id: 422,
                    helpText: "Processor Information"
                },
                {
                    displayName: "Reporting Workbench Performance",
                    id: 92,
                    helpText: "Reporting Workbench run data"
                },
                {
                    displayName: "Response Time Workflow 100 ms Buckets",
                    id: 284,
                    helpText: "Hyperspace workflow step 100 ms bucketed response times"
                },
                {
                    displayName: "Response Time Workflow 250 ms Buckets",
                    id: 283,
                    helpText: "Hyperspace workflow step 250 ms bucketed response times"
                },
                {
                    displayName: "Response Time Workflow Average by HSWeb Server",
                    id: 280,
                    helpText: "Hyperspace Web workflow step response times by Hyperspace Web server"
                },
                {
                    displayName: "Response Time Workflow Average by Location",
                    id: 281,
                    helpText: "Hyperspace workflow step response times by location"
                },
                {
                    displayName: "Response Time Workflow Average by Service Area",
                    id: 282,
                    helpText: "Hyperspace workflow step response times by service area"
                },
                {
                    displayName: "Response Time Workflow Averages",
                    id: 53,
                    helpText: "Hyperspace workflow step response times"
                },
                {
                    displayName: "Response Time Workflow Averages by Application Area",
                    id: 57,
                    helpText: "Hyperspace workflow step response times by application area"
                },
                {
                    displayName: "Response Time Workflow Averages by Client",
                    id: 55,
                    helpText: "Hyperspace workflow step response times by client"
                },
                {
                    displayName: "Response Time Workflow Averages by Database Node",
                    id: 59,
                    helpText: "Hyperspace workflow step response times organized by node"
                },
                {
                    displayName: "Response Time Workflow Averages by Department",
                    id: 56,
                    helpText: "Hyperspace workflow step response times by department"
                },
                {
                    displayName: "Response Time Workflow Averages by Special Criteria",
                    id: 60,
                    helpText: "Hyperspace workflow step response times by special criteria"
                },
                {
                    displayName: "Response Time Workflow Exceptions",
                    id: 54,
                    helpText: "Hyperspace workflow step response time exceptions"
                },
                {
                    displayName: "Response Time Workflow Step Details",
                    id: 400,
                    helpText: "Details of Workflow Steps"
                },
                {
                    displayName: "System Pulse Data Filing Performance",
                    id: 116,
                    helpText: "Filing statistics broken down by resource and logtype combination"
                },
                {
                    displayName: "System Pulse Event Log Counts",
                    id: 117,
                    helpText: "Count of warnings and errors logged to the event log today by System Pulse services"
                },
                {
                    displayName: "System Pulse MSMQ Health",
                    id: 115,
                    helpText: "Health metrics of MSMQ queue"
                },
                {
                    displayName: "System Pulse Table Size",
                    id: 114,
                    helpText: "Size of all data tables"
                },
                {
                    displayName: "System Pulse Web Site Usage",
                    id: 300,
                    helpText: "System Pulse web site usage"
                },
                {
                    displayName: "TCPv4 Session Network Statistics",
                    id: 141,
                    helpText: "Statistics of TCPv4 network performance"
                },
                {
                    displayName: "Throttling Job Counts",
                    id: 153,
                    helpText: "Throttling job counts by priority"
                },
                {
                    displayName: "Throttling Job Statistics",
                    id: 154,
                    helpText: "Cumulative statistics for throttled jobs"
                },
                {
                    displayName: "Throttling Resource Availability",
                    id: 152,
                    helpText: "Throttling resource availability by priority"
                },
                {
                    displayName: "Throttling Resource Distribution",
                    id: 151,
                    helpText: "Throttling priority usage distribution by resource"
                },
                {
                    displayName: "Throttling System Usage",
                    id: 150,
                    helpText: "Throttling system usage metrics by resource"
                },
                {
                    displayName: "vSphere CPU",
                    id: 240,
                    helpText: "vSphere performance counters for CPU utilization"
                },
                {
                    displayName: "vSphere Disk",
                    id: 242,
                    helpText: "vSphere performance counters for disk performance"
                },
                {
                    displayName: "vSphere Memory",
                    id: 241,
                    helpText: "vSphere performance counters for memory usage"
                },
                {
                    displayName: "Web Blob Disaster Recovery Metrics",
                    id: 350,
                    helpText: "Web Blob Service disaster recovery metrics"
                },
                {
                    displayName: "Welcome Kiosk Status",
                    id: 782,
                    helpText: "Welcome kiosk status indicators"
                },
                {
                    displayName: "Windows CPU Usage",
                    id: 43,
                    helpText: "Windows CPU usage stats"
                },
                {
                    displayName: "Windows Data Provider Ping",
                    id: 121,
                    helpText: "Status of network ping tests from Windows Data Provider"
                },
                {
                    displayName: "Windows Database Performance",
                    id: 187,
                    helpText: "Database performance information"
                },
                {
                    displayName: "Windows Database Server Access Methods",
                    id: 182,
                    helpText: "Database server Access Method information"
                },
                {
                    displayName: "Windows Database Server Backup Device",
                    id: 181,
                    helpText: "Database server Backup Device information"
                },
                {
                    displayName: "Windows Database Server Buffer Manager",
                    id: 184,
                    helpText: "Database server Buffer Manager information"
                },
                {
                    displayName: "Windows Database Server Buffer Node",
                    id: 180,
                    helpText: "Database server Buffer Node information"
                },
                {
                    displayName: "Windows Database Server Databases",
                    id: 178,
                    helpText: "Database server Database information"
                },
                {
                    displayName: "Windows Database Server Group Stats",
                    id: 190,
                    helpText: "Database server Workload Group Stats information"
                },
                {
                    displayName: "Windows Database Server Locks",
                    id: 177,
                    helpText: "Database server Lock information"
                },
                {
                    displayName: "Windows Database Server Memory Broker Clerks",
                    id: 176,
                    helpText: "Database server Memory Broker Clerk information"
                },
                {
                    displayName: "Windows Database Server Memory Manager",
                    id: 186,
                    helpText: "Database server Memory Manager information"
                },
                {
                    displayName: "Windows Database Server Memory Node",
                    id: 175,
                    helpText: "Database server Memory Node information"
                },
                {
                    displayName: "Windows Database Server Plan Cache",
                    id: 188,
                    helpText: "Database server Plan Cache information"
                },
                {
                    displayName: "Windows Database Server Replica",
                    id: 179,
                    helpText: "Database server Replica information"
                },
                {
                    displayName: "Windows Database Server Resource Pool Stats",
                    id: 174,
                    helpText: "Database server Resource Pool information"
                },
                {
                    displayName: "Windows Database Server SQL Statistics",
                    id: 173,
                    helpText: "Database server SQL Statistics information"
                },
                {
                    displayName: "Windows Database Server Statistics",
                    id: 185,
                    helpText: "Database server General Statistics"
                },
                {
                    displayName: "Windows Database Server Transactions",
                    id: 172,
                    helpText: "Database server Transaction information"
                },
                {
                    displayName: "Windows Database Server Wait Statistics",
                    id: 189,
                    helpText: "Database server Wait Statistics information"
                },
                {
                    displayName: "Windows Disk Performance",
                    id: 41,
                    helpText: "Windows disk performance stats"
                },
                {
                    displayName: "Windows Disk Usage",
                    id: 38,
                    helpText: "Windows disk usage stats"
                },
                {
                    displayName: "Windows Host Ping",
                    id: 118,
                    helpText: "Status of network ping tests to Windows hosts"
                },
                {
                    displayName: "Windows Local Disk Usage",
                    id: 111,
                    helpText: "Disk space in MB on logical disk of local server"
                },
                {
                    displayName: "Windows Memory Usage",
                    id: 39,
                    helpText: "Windows memory usage stats"
                },
                {
                    displayName: "Windows MSMQ Queue Depth",
                    id: 47,
                    helpText: "MSMQ queue length"
                },
                {
                    displayName: "Windows Network Interface Performance",
                    id: 65,
                    helpText: "Health and performance statistics for TCP\/IP network connections."
                },
                {
                    displayName: "Windows Page File Usage",
                    id: 40,
                    helpText: "Windows paging file usage stats"
                },
                {
                    displayName: "Windows Processes",
                    id: 42,
                    helpText: "Windows process information"
                },
                {
                    displayName: "Windows Server Communication Status",
                    id: 61,
                    helpText: "Communication between the local computer and the network"
                },
                {
                    displayName: "Windows Services Status",
                    id: 206,
                    helpText: "The details info about core services"
                },
                {
                    displayName: "Windows System Statistics",
                    id: 44,
                    helpText: "Windows system-level stats"
                },
                {
                    displayName: "Windows Terminal Session Counts",
                    id: 45,
                    helpText: "Windows Terminal Services stats"
                },
                {
                    displayName: "Windows Web Service (IIS) Performance",
                    id: 191,
                    helpText: "Windows web service (IIS) performance counters"
                }
            ];
            return logtypes;
        };
        return Application;
    }());
    Zena.Application = Application;
})(Zena || (Zena = {}));
var app = new Zena.Application();
app.run();
//check pseudo class
//if ($("#el").is(":valid")) {
//    //...
//}
//à, è, ì, ò, ù, À, È, Ì, Ò, Ù	
//á, é, í, ó, ú, ý, Á, É, Í, Ó, Ú, Ý	
//â, ê, î, ô, û, Â, Ê, Î, Ô, Û	
//ã, ñ, õ, Ã, Ñ, Õ
//var str="àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕ";
//public activateKO() {
//	ko.components.register('like-widget', {
//		viewModel: function (params) {
//			// Data: value is either null, 'like', or 'dislike'
//			this.chosenValue = params.value;
//			console.log("chosenValue:",params);
//			// Behaviors
//			this.like = function () {
//				this.chosenValue('like');
//			}.bind(this);
//			this.dislike = function () {
//				this.chosenValue('dislike');
//			}.bind(this);
//		},
//		template:
//		'<div class="like-or-dislike" data-bind="visible: !chosenValue()">\
//            <button data-bind="click: like">Like it</button>\
//            <button data-bind="click: dislike">Dislike it</button>\
//         </div>\
//            <div class="result" data-bind="visible: chosenValue">\
//               You <strong data-bind="text: chosenValue"></strong> it\
//            </div>'
//	});
//	function Product(name, rating?) {
//		this.name = name;
//		this.userRating = ko.observable(rating || null);
//	}
//	function MyViewModel() {
//		this.products = [
//			new Product('Garlic bread'),
//			new Product('Pain au chocolat'),
//			new Product('Seagull spaghetti', 'like') // This one was already 'liked'
//		];
//	}
//	ko.applyBindings(new MyViewModel());
//}
//	function htmlEncode(value) {
//	//create a in-memory div, set it's inner text(which jQuery automatically encodes)
//	//then grab the encoded contents back out.  The div never exists on the page.
//	return $('<div/>').text(value).html();
//}
//function htmlDecode(value) {
//	return $('<div/>').html(value).text();
//}
//# sourceMappingURL=app.js.map