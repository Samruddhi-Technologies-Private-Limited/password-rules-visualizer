function PasswordValidator(passwordElem, confirmElem) {
			
			var $pwdElem = $(passwordElem),
				$cfrmElem = $(confirmElem);
			// UI-elems
			var $lower = $('.lower'),
				$upper = $('.upper'),
				$special = $('.special'),
				$num = $('.num'),
				$count = $('.count'),
				$confirm = $('.confirm-check'),
				$feedback = $('.feedback'),
				$feedbackConfirm = $('.feedback-confirm'),
				$submit = $('.btn');


			$pwdElem.focus(function(e) { popout(this); });
			$pwdElem.blur(function(e) { popin(this); });
			$pwdElem.keyup(function(e) {
				check(this.value);
				confirmCheck(this, $cfrmElem)
				isValid();
				updateUI();
			});

			$cfrmElem.focus(function(e) { popout(this); });
			$cfrmElem.blur(function(e) { popin(this); });
			$cfrmElem.keyup(function(e) { confirmCheck($pwdElem, this) });

			var rules = {
				lower: /[a-z]+/,
				upper: /[A-Z]+/,
				num: /[0-9]+/,
				special: /[\!@#\€\%\&\/()\=\?\+\^\*]+/
			}

			function isValid() {

				for (var i in result) {
					if (!result[i]) {
						$feedback.text('Almost there...');
						if ($cfrmElem.hasClass('valid')) {
							$cfrmElem.removeClass('valid');
						}
						return false;
					}
				}
				if ($cfrmElem.val() === $pwdElem.val()) {
					$cfrmElem.addClass('valid');
					$confirm.addClass('valid');
				}
				$feedback.text('That\'s a great password');
				return true;
			}

			var result;

			function check(val) {
				result = {
					lower: new RegExp(rules.lower).test(val),
					upper: new RegExp(rules.upper).test(val),
					special: new RegExp(rules.special).test(val),
					num: new RegExp(rules.num).test(val),
					count: val.length >= 5
				};
				return result;
			}

			function updateUI() {
			
				function toggleIndicator(cond, elem) {
					var klass = $(elem);
					
					if (cond) {
						if (klass.hasClass('valid')) {
							return;
						} else {
							elem.addClass('valid');
							$pwdElem.addClass('valid');
						}
					} else {
						klass.removeClass('valid');
						$pwdElem.removeClass('valid');
					}
					
				}

				toggleIndicator(result.lower, $lower);
				toggleIndicator(result.upper, $upper);
				toggleIndicator(result.special, $special);
				toggleIndicator(result.num, $num);
				toggleIndicator(result.count, $count);

			}

			function popout(elem) {
				var n = elem.parentElement.childNodes;
				for (var i = 0; n.length > i; i++) {
					if ($(n[i]).hasClass('popout')) {
						$(n[i]).addClass('display');
					}
				}
				
			}

			function popin(elem) {
				var n = elem.parentElement.childNodes;
				
				for (var i = 0; n.length > i; i++) {
					
					if ($(n[i]).hasClass('display')) {
						$(n[i]).removeClass('display');
					}
				}
				
			}

			function confirmCheck (passwordElem, confirmElem) {
				var pwdVal = $(passwordElem).val(),
					cfrmVal = $(confirmElem).val();
				
				if (cfrmVal && pwdVal === cfrmVal && $pwdElem.hasClass('valid')) {
					$confirm.addClass('valid');
					$cfrmElem.addClass('valid');
					$feedbackConfirm.text('It\'s a match');
					$submit.attr('disabled', false);
				} else {
					$confirm.removeClass('valid');
					$cfrmElem.removeClass('valid');
					$feedbackConfirm.text('');
				}
			}			

			
		}